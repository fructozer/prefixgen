const chars = [
    'A','B','C','D','E','F',
    'G','H','I','J','K','L',
    'M','N','O','P','Q','R',
    'S','T','U','V','W','X',
    'Y','Z','0','1','2','3',
    '4','5','6','7','8','9'
]
export type KeyChar = 
    'A'|'B'|'C'|'D'|'E'|'F'|
    'G'|'H'|'I'|'J'|'K'|'L'|
    'M'|'N'|'O'|'P'|'Q'|'R'|
    'S'|'T'|'U'|'V'|'W'|'X'|
    'Y'|'Z'|'0'|'1'|'2'|'3'|
    '4'|'5'|'6'|'7'|'8'|'9'

export async function loadFont(url: string): Promise<Map<KeyChar,BitChar>|null>{
    const image = new Image();
    image.src = url;
    return new Promise(r=>{
        image.onload = (onLoadResult) => {
            const img = onLoadResult.target as HTMLImageElement;
            console.log(`Loaded image ${url} with w: ${img.width}, h:${img.height}`);
            if (img.width != img.height) {
                console.log('This image is invalid!')
                console.log('The width must be equal to the height.')
                r(null); return null;
            }
            if (img.width%6!=0) {
                console.log('This image is invalid!')
                console.log('The size must be divisible by 6.')
                r(null); return null;
            }
            const size = img.width;
            const step = size / 6;
            const cvx = new OffscreenCanvas(img.width, img.height);
            const ctx = cvx.getContext('2d')!
            ctx.drawImage(img, 0, 0);
            const data = ctx.getImageData(0,0,size,size).data;
            const map:Map<string,BitChar> = new Map()
            for (let i=0; i<36; i++){
                const x = i%6*step;
                const y = Math.floor(i/6)*step;
                const c = chars[i];
                let rx1 = x+6, ry1 = y+6;
                let rx2 = x, ry2 = y;
                for (let a=x; a<x+6; a++)
                for (let b=y; b<y+6; b++){
                    let alpha = data[4*(b*size+a)+3]; //Read alpha
                    if (alpha>0) {
                        rx1 = Math.min(rx1,a)
                        ry1 = Math.min(ry1,b)
                        rx2 = Math.max(rx2,a)
                        ry2 = Math.max(ry2,b)
                    }
                }
                const font_data: boolean[] = []
                for (let a=rx1; a<=rx2; a++)
                for (let b=ry1; b<=ry2; b++){
                    let alpha = data[4*(b*size+a)+3];
                    font_data.push(alpha>0)
                }   
                
                console.log(c)
                console.log(font_data)
                const bitChar = new BitChar( ry2-ry1+1,rx2-rx1+1, font_data)
                map.set(c, bitChar);
            }
            r(map as Map<KeyChar,BitChar>)
        };
    })
}

export class BitChar{
    constructor(
        public width:number,
        public height:number,
        public data: boolean[]
    ){}

    draw(context: CanvasRenderingContext2D, x:number, y:number){
        for (let a=0;a<this.width;a++)
        for (let b=0;b<this.height;b++){
            if (this.data[b*this.width+a])
                context.fillRect(b+y,a+x,1,1);
        }
        return y+this.height+1;
    }
}
export function drawText(
    context: CanvasRenderingContext2D, 
    font: Map<KeyChar,BitChar>, 
    text: string, x: number, y: number){
    const t = text
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    let cursor = x
    for (let i=0; i<t.length; i++){
        if (t.charAt(i)==' ') {
            cursor+=3
            continue
        }
        cursor = font.get(t.charAt(i) as KeyChar)!.draw(context!,y,cursor)
    }
}