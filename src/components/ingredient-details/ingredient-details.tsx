import style from "./ingredient-details.module.css"
import classNames from 'classnames';
import {useSelector} from "../../services/hooks";
import { useParams } from "react-router-dom";
import {TIngredient} from "../../services/types/types";

const IngredientDetails = () => {

  const { ingredientId } = useParams<{ ingredientId?: string }>();

  const { allIngredients } = useSelector(state => state.burgerIngredients);
  const allIngredientsArray = allIngredients as TIngredient[];

  let ingredient: TIngredient = allIngredientsArray.filter(ingredient => ingredient._id === ingredientId)[0];
  if (!ingredient) {
    return <></>
  }

  return (
      <div className={classNames(style['ingredient-block'])} >
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
          <h3 className={classNames(style['ingredient-details-image'], 'text', 'text_type_main-medium', 'pb-8')}>{ingredient.name}</h3>
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

export default IngredientDetails;
