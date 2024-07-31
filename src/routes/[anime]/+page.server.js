export async function load({ params, fetch }) {
    let data

	try {
		const response = await fetch(`${import.meta.env.VITE_JIKAN_API_URI}/anime/${params.anime}`)

        if (!response.ok) console.log("Response failed")
        else data = await response.json()
    }
    catch (error) {
        console.log(error)
    }

    return {
        anime: data?.data || []
    }
}