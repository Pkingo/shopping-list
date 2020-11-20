<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let open: boolean = false;
  const dispatch = createEventDispatcher();
  const onClick = () => dispatch("toggle");
</script>

<style>
  button {
    display: none;
  }
  @media (max-width: 768px) {
    button {
      display: flex;
      justify-self: end;
      flex-direction: column;
      justify-content: space-around;
      width: 2rem;
      height: 2rem;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 12;
    }
    button:focus {
      outline: none;
    }
    button > div {
      width: 2rem;
      height: 0.25rem;
      background-color: white;
      border-radius: 10px;
      transition: all 0.3s linear;
      position: relative;
      transform-origin: 1px;
    }
    button[data-open="close"] > div:nth-child(1) {
      transform: rotate(0);
    }
    button[data-open="open"] > div:nth-child(1) {
      transform: rotate(45deg);
      width: 2.1rem;
    }
    button[data-open="close"] > div:nth-child(2) {
      opacity: 1;
      transform: translateX(0);
    }
    button[data-open="open"] > div:nth-child(2) {
      opacity: 0;
      transform: translateX(20px);
    }
    button[data-open="close"] > div:nth-child(3) {
      transform: rotate(0);
    }
    button[data-open="open"] > div:nth-child(3) {
      transform: rotate(-45deg);
      width: 2.1rem;
    }
  }
</style>

<button data-open={open ? 'open' : 'close'} on:click={onClick}>
  <div />
  <div />
  <div />
</button>
