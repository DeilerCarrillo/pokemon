import { useNavigate } from "react-router";
const List = ({
    pokemonList,
    total,
    nextUrl,
    previousUrl,
    changePageHandler = ()=>{}
})=>{
    return (
        <>
            <section className="plList">
                {pokemonList?.map((pk)=>{
                    return (<ListItem name={pk.name} url={pk.url} key={pk.name} />)
                })}
            </section>
            <section className="pActions">
                {previousUrl && (<button onClick={()=>{changePageHandler(previousUrl)}}>
                        Atrás
                    </button>
                )}
                {nextUrl && (<button onClick={()=>{changePageHandler(nextUrl)}}>
                        Siguiente
                    </button>
                )}
            </section>
        </>
    );

}

/* firma de todo componente en React es
function (props, ref) {
    const name = props.name;
    const url = props.url;
}

*/

const ListItem = ({name, url})=>{
    const navigateTo = useNavigate()
    return (
        <div onClick={(e)=>{
            const id = url.split('/').at(-2);
            navigateTo(`/pokemon/${id}`);
        }} className="PokemonCard">
            {name}
        </div>
    );
}

export default List;