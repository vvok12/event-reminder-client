<script lang="ts">
    import { page } from '$app/state';
	import ProfileMenu from './profile/ProfileMenu.svelte';
	import menuIcon from '$lib/images/menu-icon.png';
	
	let isOpen = $state(false);
    const currentPath = $derived(page.url.pathname);
</script>

<nav>
    <button 
        aria-label="Menu Button" 
        onclick={() => { isOpen = !isOpen; }}>
        <img src={menuIcon} alt="Menu Icon" />
    </button>
    
    {#if isOpen}
        {#if currentPath === '/profile'}
            <ProfileMenu closeMenu={() => isOpen = false} />
        {/if}
    {/if}
</nav>

<style>
    nav {
        position: fixed;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    nav img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

    nav button {
        background: none;
        border: none;
        cursor: pointer;
    }

    nav button:focus {
        outline: 2px solid blue;
    }

</style>