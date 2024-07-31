<script>
    export let data
    $: animeInfo = data?.anime

    let synopsisLength = 250
    let readMore = false

    $: if (animeInfo?.synopsis.length > synopsisLength) {
        readMore = true
    }

    const modifyEmbedTrailer = (url) => {
        if (!url) return ""

        if (url.includes("autoplay=1")) return url.replace("autoplay=1", "autoplay=0")
        else return ""
    }

    const formatNumber = (num) => {
        if (typeof num !== "number") {
            return 0
        }
        
        return new Intl.NumberFormat().format(num)
    }
</script>
<div class="max-w-screen page-bg mx-auto py-6 px-4 rounded-lg shadow-md">
    <!-- Anime Title and Image -->
    <div class="flex justify-between md:flex-row flex-col md:gap-0 gap-3 w-full md:h-[400px] h-auto">
        <img 
            src={animeInfo?.images?.webp?.large_image_url || animeInfo?.images?.webp?.image_url} 
            alt="Anime" 
            class="md:hover:scale-95 md:hover:rotate-[-1deg] md:duration-300 md:w-1/4 md:min-w-[300px] md:h-full md:max-h-[400px] w-full h-3/4 object-cover rounded-lg"
        >
        <div class="w-full md:ml-3 md:mb-3 items-center flex justify-between">
            <div class="w-full h-[30%] py-2 rounded-md modal flex justify-between items-center">
                <div class="flex flex-col items-center w-full">
                    <div class="text-sm uppercase bg-blue-700 px-2 py-1 rounded-md font-semibold">Score</div>
                    <h1 class="text-xl md:text-3xl font-bold">{animeInfo?.score || "N/A"}</h1>
                    <h1 class="text-center">{formatNumber(animeInfo?.scored_by) || "N/A"} users</h1>
                </div>
                <div class="flex flex-col items-center w-full">
                    <div class="text-sm uppercase bg-blue-700 px-2 py-1 rounded-md font-semibold">Popularity</div>
                    <h1 class="text-xl md:text-3xl font-bold">#{animeInfo?.popularity || "N/A"}</h1>
                </div>
                <div class="flex flex-col items-center w-full">
                    <div class="text-sm uppercase bg-blue-700 px-2 py-1 rounded-md font-semibold">Ranked</div>
                    <h1 class="text-xl md:text-3xl font-bold">#{animeInfo?.rank || "N/A"}</h1>
                </div>
                <div class="flex flex-col items-center w-full">
                    <div class="text-sm uppercase bg-blue-700 px-2 py-1 rounded-md font-semibold">Members</div>
                    <h1 class="text-xl md:text-3xl font-bold">{formatNumber(animeInfo?.members) || "N/A"}</h1>
                </div>
            </div>
        </div>
    </div>

    {#if animeInfo?.trailer?.embed_url}
        <div class="mt-6">
            <h2 class="text-xl font-semibold">Trailer</h2>
            <div class="md:w-[735px] md:max-w-screen w-full mt-1 h-[300px] flex justify-center items-center md:h-[400px]">
                <iframe class="w-full h-full" src={modifyEmbedTrailer(animeInfo?.trailer?.embed_url)} title="YouTube video player" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    {/if}

    <!-- Synopsis -->
    {#if animeInfo?.synopsis}
        <div class="mt-6">
            <h2 class="text-xl font-semibold">Synopsis</h2>
            {#if readMore}
                <p class="mt-1 text-gray-700">{animeInfo?.synopsis.slice(0, synopsisLength)}...</p>
                <button class="text-blue-500 cursor-pointer" on:click={() => readMore = false}>Read more</button>
            {:else}
                <p class="mt-1 text-gray-700">{animeInfo?.synopsis}</p>
                <button class="text-blue-500 cursor-pointer" on:click={() => readMore = true}>Close</button>
            {/if}
        </div>
    {/if}


    <!-- <div class="md:ml-6 ml-0 md:w-1/4 md:h-full md:max-h-[400px] w-full h-3/4">
        <h1 class="text-2xl font-bold">{animeInfo?.title_english || animeInfo?.title}</h1>
        <p class="text-gray-600"><span class="font-bold">English Title:</span> {animeInfo?.title_english || "N/A"}</p>
        <p class="text-gray-600"><span class="font-bold">Japanese Title:</span> {animeInfo?.title_japanese}</p>
        <p class="text-gray-600"><span class="font-bold">Type:</span> {animeInfo?.type || "N/A"}</p>
        <p class="text-gray-600"><span class="font-bold">Episodes:</span> {animeInfo?.episodes || "N/A"}</p>
        <p class="text-gray-600"><span class="font-bold">Status:</span> {animeInfo?.status || "N/A"}</p>
        <p class="text-gray-600"><span class="font-bold">Aired:</span> {animeInfo?.aired?.string || "N/A"}</p>
        <p class="text-gray-600"><span class="font-bold">Duration:</span> {animeInfo?.duration || "N/A"}</p>
        <p class="text-gray-600"><span class="font-bold">Rating:</span> {animeInfo?.rating || "N/A"}</p>
        <p class="text-gray-600"><span class="font-bold">Members:</span> {animeInfo?.members || "N/A"}</p>
        <p class="text-gray-600"><span class="font-bold">Favorites:</span> {animeInfo?.favorites || "N/A"}</p>
    </div> -->

    <!-- Producers, Licensors, and Studios -->
    <div class="mt-6">
        {#if animeInfo?.producers?.length > 0}
            <h2 class="text-xl font-semibold">Producers</h2>
            <ul class="list-disc ml-6 mt-1">
                {#each animeInfo?.producers as producer}
                    <li><a href={producer?.url} class="text-blue-500" target="_blank">{producer?.name}</a></li>
                {/each}
            </ul>
        {/if}

        {#if animeInfo?.licensors?.legnth > 0}
            <h2 class="text-xl font-semibold mt-4">Licensors</h2>
            <ul class="list-disc ml-6 mt-1">
                {#each animeInfo?.licensors as licensor}
                    <li><a href={licensor?.url} class="text-blue-500" target="_blank">{licensor?.name}</a></li>
                {/each}
            </ul>
        {/if}
        
        {#if animeInfo?.studios?.length > 0}
            <h2 class="text-xl font-semibold mt-4">Studios</h2>
            <ul class="list-disc ml-6 mt-1">
                {#each animeInfo?.studios as studio}
                    <li><a href={studio?.url} class="text-blue-500" target="_blank">{studio?.name}</a></li>
                {/each}
            </ul>
        {/if}
    </div>

    <!-- Genres and Themes -->
    <div class="mt-6">
        {#if animeInfo?.genres?.length > 0}
            <h2 class="text-xl font-semibold">Genres</h2>
            <ul class="list-disc ml-6 mt-1">
                {#each animeInfo?.genres as genre}
                    <li><a href={genre?.url} class="text-blue-500" target="_blank">{genre?.name}</a></li>
                {/each}
            </ul>
        {/if}
        
        {#if animeInfo?.themes?.length > 0}
            <h2 class="text-xl font-semibold mt-4">Themes</h2>
            <ul class="list-disc ml-6 mt-1">
                {#each animeInfo?.themes as theme}
                    <li><a href={theme?.url} class="text-blue-500" target="_blank">{theme?.name}</a></li>
                {/each}
            </ul>
        {/if}
    </div>
</div>