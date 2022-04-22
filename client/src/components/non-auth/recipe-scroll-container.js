import styles from './styles/recipe-scroll-container.scss';

const RecipeScrollContainer = ({ title, data }) => {
  return (
    <>
      <div className="outer-container">
        <h2 className="title">{title}</h2>

        <div className="scroll-container">
          {data && data.map(recipe => (
            <div className="preview" key={recipe.title}>
              {recipe.title}
            </div>
          ))
          }

        </div>
      </div>

    </>

  );
};

export default RecipeScrollContainer;