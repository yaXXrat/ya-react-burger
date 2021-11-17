import style from "./burger-ingredient-details.module.css"
import PropTypes from "prop-types";
import classNames from 'classnames';

const IngredientDetails = ({ ingredient }) => {
  return (
      <div>
        <div
          className={classNames('text', 'text_type_main-large', style.details)}
        >
          Детали ингредиента
        </div>
        <div>
          <img 
            src={ingredient.image_large} 
            alt={ingredient.name}
            className={style['ingredient-image']}
          />
          <h3 className={classNames(style['burger-ingredient-details-image'], 'text', 'text_type_main-medium', 'pb-8')}>{ingredient.name}</h3>
          <ul className={classNames('text_color_inactive', 'text', 'text_type_main-default', 'mb-5', style['ingredient-details'])}>
            <li>
              <h3 className={classNames('text', 'text_type_main-default')}>Калории, ккал</h3>
              <span className="text text_type_digits-default">
                {ingredient.calories}
              </span>
            </li>
            <li>
              <h3 className={classNames('text', 'text_type_main-default')}>Белки, г</h3>
              <span className="text text_type_digits-default">
                {ingredient.proteins}
              </span>
            </li>
            <li>
              <h3 className={classNames('text', 'text_type_main-default')}>Жиры, г</h3>
              <span className="text text_type_digits-default">
                {ingredient.fat}
              </span>
            </li>
            <li>
              <h3 className={classNames('text', 'text_type_main-default')}>Углеводы, г</h3>
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
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
}).isRequired,
};
export default IngredientDetails;
