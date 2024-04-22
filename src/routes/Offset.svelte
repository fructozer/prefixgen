<script lang="ts">
    import s from 'jquery'
    import { writable, type Writable } from "svelte/store";
    export let offset = {x: 0, y: 1}
    const a = writable(7)
    function sel(e: MouseEvent ,x:number, y:number){
        offset = {x, y}
        s(".pos").removeClass('sel')
        s(e.target as HTMLSpanElement).addClass('sel')
    }
    
</script>
<div class="position">
    <span class="pos" class:sel={$a==0} role={"button"} on:click={e=>{sel(e,-1,-1);$a=0}}></span>
    <span class="pos" class:sel={$a==1} role={"button"} on:click={e=>{sel(e, 0,-1);$a=1}}></span>
    <span class="pos" class:sel={$a==2} role={"button"} on:click={e=>{sel(e, 1,-1);$a=2}}></span>
    <span class="pos" class:sel={$a==3} role={"button"} on:click={e=>{sel(e,-1, 0);$a=3}}></span>
    <span class="pos" class:sel={$a==4} role={"button"} on:click={e=>{sel(e, 0, 0);$a=4}}></span>
    <span class="pos" class:sel={$a==5} role={"button"} on:click={e=>{sel(e, 1, 0);$a=5}}></span>
    <span class="pos" class:sel={$a==6} role={"button"} on:click={e=>{sel(e,-1, 1);$a=6}}></span>
    <span class="pos" class:sel={$a==7} role={"button"} on:click={e=>{sel(e, 0, 1);$a=7}}></span>
    <span class="pos" class:sel={$a==8} role={"button"} on:click={e=>{sel(e, 1, 1);$a=8}}></span>
</div>




<style>
    .position {
        display: grid;
        grid-template-columns: auto auto auto;
    }
    .pos {
        width: 16px;
        height: 16px;
        border: 1px solid rgb(167, 167, 167);
        margin-right: 1px;
        margin-bottom: 1px;
        border-radius: 2px;
        color: transparent;
    }
    .pos:hover{
        border-color: white;
    }
    .sel {
        background: rgb(167, 167, 167);
    }
    .sel:hover {
        background: white;
    }
</style>