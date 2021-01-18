import { render } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import BurgerButton from "./BurgerButton";
import * as actions from "../../actions/actions";

describe("Burger Button", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Route>
          <BurgerButton />
        </Route>
      </BrowserRouter>
    );
  });
  test("renders learn react link", () => {
    const linkElement = document.getElementById('first-menu__species');
    expect(linkElement.innerHTML).toBe('Species');
  });

  test("should show the first menu when clic menu button", () => {
    const menuButton = document.getElementById("burger-button");
    const firstMenu = document.getElementById("burger-firstMenu");
    menuButton.click();
    expect(firstMenu.style.left).toBe("-15px");
  });

  test("should hide the first menu when clic menu button twice", () => {
    const menuButton = document.getElementById("burger-button");
    const firstMenu = document.getElementById("burger-firstMenu");
    menuButton.click();
    menuButton.click();
    expect(firstMenu.style.left).toBe("-300px");
  });

  test("should show the second menu when clic species button", () => {
    const menuButton = document.getElementById("burger-button");
    const speciesButton = document.getElementById("first-menu__species");
    const secondMenu = document.getElementById("burger-secondMenu");
    menuButton.click();
    speciesButton.click();
    expect(secondMenu.style.left).toBe("-15px");
  });

  test("should hide the second menu when clic menu button", () => {
    const menuButton = document.getElementById("burger-button");
    const speciesButton = document.getElementById("first-menu__species");
    const secondMenu = document.getElementById("burger-secondMenu");
    menuButton.click();
    speciesButton.click();
    expect(secondMenu.style.left).toBe("-15px");
    menuButton.click();
    expect(secondMenu.style.left).toBe("-300px");
  });

  test("Link Dogs should call requestAnimals when clic", () => {
    const dogsButton = document.getElementById("secondMenu__dogs");
    actions.requestAnimals = jest.fn();
    dogsButton.click();
    expect(actions.requestAnimals).toHaveBeenCalledTimes(1);
  });

  test("Link Cats should call requestAnimals when clic", () => {
    const catsButton = document.getElementById("secondMenu__cats");
    actions.requestAnimals = jest.fn();
    catsButton.click();
    expect(actions.requestAnimals).toHaveBeenCalledTimes(1);
  });

  test("Link Horses should call requestAnimals when clic", () => {
    const horsesButton = document.getElementById("secondMenu__horses");
    actions.requestAnimals = jest.fn();
    horsesButton.click();
    expect(actions.requestAnimals).toHaveBeenCalledTimes(1);
  });

  test("Link Rabbits should call requestAnimals when clic", () => {
    const rabbitsButton = document.getElementById("secondMenu__rabbits");
    actions.requestAnimals = jest.fn();
    rabbitsButton.click();
    expect(actions.requestAnimals).toHaveBeenCalledTimes(1);
  });

  test("Link Small Animals should call requestAnimals when clic", () => {
    const smallAnimalsButton = document.getElementById(
      "secondMenu__small-animals"
    );
    actions.requestAnimals = jest.fn();
    smallAnimalsButton.click();
    expect(actions.requestAnimals).toHaveBeenCalledTimes(1);
  });

  test("burgerClick should be called", () => {
    const menuButton = document.getElementById("burger-button");
    menuButton.onclick = jest.fn();
    menuButton.click();
    expect(menuButton.onclick).toHaveBeenCalled();
  });

  test("burger button should collapse on contact us click", () => {
    const firstMenu = document.getElementById("burger-firstMenu");
    const secondMenu = document.getElementById("menu-button__Contact");
    secondMenu.click();
    expect(firstMenu.style.left).toBe("-300px");
  });

  test("burger button should collapse on main page click", () => {
    const firstMenu = document.getElementById("burger-firstMenu");
    const secondMenu = document.getElementById("menu-button__Main");
    secondMenu.click();
    expect(firstMenu.style.left).toBe("-300px");
  });
});
