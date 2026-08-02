import { useCallback, useEffect, useState } from "react";

const baseAPIUrl = "https://pokeapi.co/api/v2/";

const usePokemonApi = () => {
  const [pokemonsLoaded, setPokemonsLoaded] = useState({});
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const setOffsetAndLimit = useCallback((newOffset = 0, newLimit = 20) => {
    setOffset(newOffset);
    setLimit(newLimit);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    setStatus("loading");
    setError(null);

    fetch(`${baseAPIUrl}pokemon?offset=${offset}&limit=${limit}`, {
      signal: controller.signal,
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error(`Error al cargar Pokémon: ${result.status}`);
        }

        return result.json();
      })
      .then((data) => {
        setPokemonsLoaded(data);
        setStatus("idle");
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        }

        console.error(err);
        setPokemonsLoaded({});
        setError(err);
        setStatus("error");
      });

    return () => {
      controller.abort();
    };
  }, [offset, limit]);

  return {
    pokemonsLoaded,
    offset,
    limit,
    status,
    error,
    setOffsetAndLimit,
  };
};

export const usePokemonDetailApi = (id) => {
  const [pokemonLoaded, setPokemonLoaded] = useState({});
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setStatus("error");
      setError(new Error("No se recibió el ID del Pokémon"));
      return;
    }

    const controller = new AbortController();

    setStatus("loading");
    setError(null);
    setPokemonLoaded({});

    fetch(`${baseAPIUrl}pokemon/${id}`, {
      signal: controller.signal,
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error(`No se encontró el Pokémon: ${result.status}`);
        }

        return result.json();
      })
      .then((data) => {
        console.log(data);
        setPokemonLoaded(data);
        setStatus("idle");
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return;
        }

        console.error(err);
        setPokemonLoaded({});
        setError(err);
        setStatus("error");
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  return {
    pokemonLoaded,
    status,
    error,
  };
};

export default usePokemonApi;
