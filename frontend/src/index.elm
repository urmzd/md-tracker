module Main exposing (Model, init, main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Browser.Events exposing (onClick)


main =
    Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model =
    int


init : Model
init =
    0

-- UPDATE

type Msg = Increment | Decrement
update: Msg -> Model -> Model
update msg Model =
  case msg of
     Increment ->
       model + 1

      Decrement -> 
        model - 1

-- Viewport

view : Model -> Html msg
view model =
  div[]
    [
        button [onClick Decrement] [text "-"]
        , div [] [text (String.fromInt model)]
        , button [onClick Increment] [text "+"]
    ]
