import { useParams } from "react-router-dom";
import { usePokemon } from "../../services/usePokemon";
import { useStorage } from "../../services/useStorage";
import { useEffect } from "react";

export const Pokemon = () => {
  const { name } = useParams();

  const { value, set } = useStorage(name);

  const { pokemon, isPending, invalidatePokemon } = usePokemon(name);

  useEffect(() => {
    set(JSON.stringify(pokemon));
  }, [pokemon]);

  console.log(value);

  return !isPending ? (
    <>
      <h2>{name}</h2>
      <img src={pokemon.sprites.front_default} alt="" />
      <button
        onClick={() => {
          invalidatePokemon();
        }}
      >
        Invalidate pokemon
      </button>
    </>
  ) : (
    "Chargement en cours"
  );
};

export default Pokemon;
