import style from "./burger-ingredient-details.module.css"
import PropTypes from "prop-types";
import classNames from 'classnames';

const IngredientDetails = ({ ingredient }) => {
  return (
      <div>
        <div
          className={classNames(style['burger-ingredient-details-image'], 'text', 'text_type_main-large')}
        >
          Детали ингредиента
        </div>
        <div className={style.ingredient}>
          <img 
            src={ingredient.image_large} 
            alt={ingredient.name}
          />
          <h3>{ingredient.name}</h3>
          <ul>
            <li 
              className={classNames(style['burger-ingredient-details-image'], 'text', 'text_type_main-default')}
            >
              <h3>Калории, ккал</h3>{" "}
              <span className="text text_type_digits-default">
                {ingredient.calories}
              </span>
            </li>
            <li className="text text_type_main-default">
              <h3>Белки, г</h3>{" "}
              <span className="text text_type_digits-default">
                {ingredient.proteins}
              </span>
            </li>
            <li className="text text_type_main-default">
              <h3>Жиры, г</h3>{" "}
              <span className="text text_type_digits-default">{ingredient.fat}</span>
            </li>
            <li className="text text_type_main-default">
              <h3>Углеводы, г</h3>{" "}
              <span className="text text_type_digits-default">
                {ingredient.carbohydrates}
              </span>
            </li>
          </ul>
        </div>
      </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.object.isRequired,
};
export default IngredientDetails;