import {useState, useMemo} from 'react';
import usePokemonAPI from '../services/PokeApiService';
import ListOfPokemons from '../components/pokemon/List';
const PokemonList = ()=>{
    const {pokemonsLoaded, offset, limit, status, setOffsetAndLimit} = usePokemonAPI();
    const moveToPage = useMemo(()=>(url)=>{
        const [ ,queryParams] = url.split('?');
        const [offsetStr, limitStr] = queryParams.split('&');
        const [ ,offset] = offsetStr.split('=');
        const [ ,limit] = limitStr.split('=');
        console.log(url, offset, limit);
        setOffsetAndLimit(Number(offset), Number(limit));
    }, [setOffsetAndLimit]);
    return (
        <section className="pokemonPage">
            <h2>Pokemon List from API</h2>
            {(status == "loading") && (
                <div> Cargando Pokemon List</div>
            )}
            {(status == "error") && (
                <div> Error al Carga Pokemon List</div>
            )}
            {(status == "idle") && pokemonsLoaded && (
                <>
                    <ListOfPokemons
                        pokemonList={pokemonsLoaded?.results}
                        total={pokemonsLoaded?.count}
                        nextUrl={pokemonsLoaded?.next}
                        previousUrl={pokemonsLoaded?.previous}
                        changePageHandler={moveToPage}
                    />
                    {/* <pre>{JSON.stringify(pokemonsLoaded , null, 2)}</pre> */}
                </>
            )}
        </section>
    )
}

export default PokemonList;
