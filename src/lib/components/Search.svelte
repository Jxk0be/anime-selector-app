<script>
    let searchValue = ""
    let timer
    $: anime = []

    const updateSearchResults = async () => {
        try {
            if (searchValue.trim() === "") {
                return []
            }

            const response = await fetch(`${import.meta.env.VITE_JIKAN_API_URI}/anime?q=${searchValue}&limit=5`)
            if (!response.ok) {
                console.log("Response failed")
                return []
            }
            const data = await response.json()
            return data?.data
        }
        catch (error) {
            console.log(error)
        }
        return []
    }

    const debounce = async () => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
            anime = await updateSearchResults()
            console.log(anime)
		}, 300);
	}
</script>

<div class="w-full h-full">
    <input bind:value={searchValue} on:input={debounce} type="text" placeholder="Search..." class=" focus:outline-none w-full px-4 py-2 border border-gray-300 shadow-sm" />
</div>

{#if anime?.length > 0}
    <div class="top-full left-0 w-full bg-white border h-auto border-gray-300 shadow-md z-10">
        {#each anime as ani}
            {#if ani?.images?.webp?.image_url}
                <a href={`/${ani?.mal_id}`} class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <img
                        src={ani.images.webp.image_url}
                        alt={ani.title_english || ani.title}
                        class="w-16 h-16 object-cover rounded-md"
                    />
                    <div class="ml-4 py-2">
                        <h1 class="text-lg font-semibold">{ani.title_english || ani.title}</h1>
                    </div>
                </a>
            {/if}
        {/each}
    </div>
{/if}