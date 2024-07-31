<script>
    export let data
    $: animeInfo = data?.anime
</script>
<div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
    <!-- Anime Title and Image -->
    <div class="flex items-center">
        <img src={animeInfo?.images?.jpg?.image_url} alt="Anime" class="w-32 h-32 object-cover rounded-lg">
        <div class="ml-6">
            <h1 class="text-2xl font-bold">{animeInfo?.title}</h1>
            <p class="text-gray-600"><span class="font-bold">English Title:</span> {animeInfo?.title_english}</p>
            <p class="text-gray-600"><span class="font-bold">Japanese Title:</span> {animeInfo?.title_japanese}</p>
            <p class="text-gray-600"><span class="font-bold">Type:</span> {animeInfo?.type}</p>
            <p class="text-gray-600"><span class="font-bold">Episodes:</span> {animeInfo?.episodes}</p>
            <p class="text-gray-600"><span class="font-bold">Status:</span> {animeInfo?.status}</p>
            <p class="text-gray-600"><span class="font-bold">Aired:</span> {animeInfo?.aired?.string}</p>
            <p class="text-gray-600"><span class="font-bold">Duration:</span> {animeInfo?.duration}</p>
            <p class="text-gray-600"><span class="font-bold">Rating:</span> {animeInfo?.rating}</p>
            <p class="text-gray-600"><span class="font-bold">Score:</span> {animeInfo?.score} (Scored by {animeInfo?.scored_by})</p>
            <p class="text-gray-600"><span class="font-bold">Rank:</span> {animeInfo?.rank}</p>
            <p class="text-gray-600"><span class="font-bold">Popularity:</span> {animeInfo?.popularity}</p>
            <p class="text-gray-600"><span class="font-bold">Members:</span> {animeInfo?.members}</p>
            <p class="text-gray-600"><span class="font-bold">Favorites:</span> {animeInfo?.favorites}</p>
        </div>
    </div>

    <!-- Synopsis -->
    {#if animeInfo?.synopsis}
        <div class="mt-6">
            <h2 class="text-xl font-semibold">Synopsis</h2>
            <p class="mt-2 text-gray-700">{animeInfo?.synopsis}</p>
        </div>
    {/if}

    <!-- Trailer -->
    {#if animeInfo?.trailer?.embed_url}
        <div class="mt-6">
            <h2 class="text-xl font-semibold">Trailer</h2>
            <iframe width="560" height="315" src={animeInfo?.trailer?.embed_url} title="YouTube video player" frameborder="0" allowfullscreen></iframe>
        </div>
    {/if}


    <!-- Producers, Licensors, and Studios -->
    <div class="mt-6">
        {#if animeInfo?.producers?.length > 0}
            <h2 class="text-xl font-semibold">Producers</h2>
            <ul class="list-disc ml-6">
                {#each animeInfo?.producers as producer}
                    <li><a href={producer?.url} class="text-blue-500" target="_blank">{producer?.name}</a></li>
                {/each}
            </ul>
        {/if}

        {#if animeInfo?.licensors?.legnth > 0}
            <h2 class="text-xl font-semibold mt-4">Licensors</h2>
            <ul class="list-disc ml-6">
                {#each animeInfo?.licensors as licensor}
                    <li><a href={licensor?.url} class="text-blue-500" target="_blank">{licensor?.name}</a></li>
                {/each}
            </ul>
        {/if}
        
        {#if animeInfo?.studios?.length > 0}
            <h2 class="text-xl font-semibold mt-4">Studios</h2>
            <ul class="list-disc ml-6">
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
            <ul class="list-disc ml-6">
                {#each animeInfo?.genres as genre}
                    <li><a href={genre?.url} class="text-blue-500" target="_blank">{genre?.name}</a></li>
                {/each}
            </ul>
        {/if}
        
        {#if animeInfo?.themes?.length > 0}
            <h2 class="text-xl font-semibold mt-4">Themes</h2>
            <ul class="list-disc ml-6">
                {#each animeInfo?.themes as theme}
                    <li><a href={theme?.url} class="text-blue-500" target="_blank">{theme?.name}</a></li>
                {/each}
            </ul>
        {/if}
    </div>
</div>