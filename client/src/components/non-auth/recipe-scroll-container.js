import styles from './styles/recipe-scroll-container.scss';
import RecipePreview from './recipe-preview';

const RecipeScrollContainer = ({ title, data }) => {
  return (
    <>
      <div className="outer-container">
        <h2 className="title">{title}</h2>

        <div className="scroll-container">
          {data && data.map(recipe => (
            <RecipePreview recipe={recipe} category={title} key={recipe.title} />
          ))
          }
        </div>
      </div>

    </>

  );
};

export default RecipeScrollContainer;