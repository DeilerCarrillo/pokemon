import {Card, CardBody, CardFooter, CardHeaderWithImage} from "../components/cards"
import { useNavigate, useParams } from "react-router";


import { usePokemonDetailApi } from "../services/PokeApiService"

const PokemonDetail = ()=>{
    const {id} = useParams();
    const navigateTo = useNavigate();
    const {
        pokemonLoaded,
        status
    } = usePokemonDetailApi(id);

    return (
        <section className="pokemonDetailPage">

            {(status == "loading") && (
                <div>
                    Cargando información del Pokémon
                </div>
            )}

            {(status == "error") && (
                <div>
                    Error al cargar la información del Pokémon
                </div>
            )}

            {(status == "idle") && pokemonLoaded.name && (
                <Card>

                    <CardHeaderWithImage
                        imgUrl={
                            pokemonLoaded
                                .sprites
                                .other
                                .home
                                .front_default
                        }
                        altText={pokemonLoaded.name}
                    />

                    <CardBody>
                        <h2>{pokemonLoaded.name}</h2>

                        <p>
                            <strong>ID:</strong>
                            {' '}
                            {pokemonLoaded.id}
                        </p>

                        <p>
                            <strong>Altura:</strong>
                            {' '}
                            {pokemonLoaded.height / 10} metros
                        </p>

                        <p>
                            <strong>Peso:</strong>
                            {' '}
                            {pokemonLoaded.weight / 10} kilogramos
                        </p>

                        <p>
                            <strong>Experiencia base:</strong>
                            {' '}
                            {pokemonLoaded.base_experience}
                        </p>

                        <p>
                            <strong>Tipo:</strong>
                            {' '}
                            {
                                pokemonLoaded.types
                                    .map((item)=>item.type.name)
                                    .join(', ')
                            }
                        </p>

                        <p>
                            <strong>Habilidades:</strong>
                            {' '}
                            {
                                pokemonLoaded.abilities
                                    .map((item)=>item.ability.name)
                                    .join(', ')
                            }
                        </p>
                    </CardBody>

                    <CardFooter>
                        <button
                            className="pokemonBackButton"
                            onClick={()=>navigateTo('/pokemon')}
                        >
                            Volver a la lista
                        </button>
                    </CardFooter>

                </Card>
            )}

        </section>
    )
}

export default PokemonDetail;
