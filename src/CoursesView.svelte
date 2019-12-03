<script>
  import { beforeUpdate } from 'svelte';
  export let data;
  let courses = [];
  beforeUpdate(function() {
    courses = data.courses !== undefined ? data.courses : [];
  });
</script>

<style>
</style>

{#if courses.length > 0}
    <ul>
        {#each courses as course}
            <li>{course}</li>
        {/each}
    </ul>
{/if}