module Main exposing (Model, init, main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Time



{-
   @version 1

       US1: As a user, I want a stopwatch-like capability so that
       I can record the symptoms associated with an episode.

          AT1: Given that the user is on the screen, when the `play` button
          is pressed, then a timer should start indicating the length of an episode.

          AT2: Given that the user is on the screen and the play button has been pressed,
          then the play button should become a `stop` button.

          AT3: Given that the user is on the screen, when the `stop` button is pressed
          then the timer should stop.
-}


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- Declare types
{--
  -type alias Name =
  -    String
  -
  -
  -type alias StartTime =
  -    Float
  -
  -
  -type alias EndTime =
  -    Float
  -
  -
  -type TimeLog
  -    = PartialLog Name StartTime
  -    | CompleteLog Name StartTime EndTime
  --}
-- MODEL


type alias Model =
    { time : Time.Posix
    , stop : Bool
    }


type Msg
    = Tick Time.Posix
    | Stop Bool


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model (Time.millisToPosix 0) False, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    if model.stop then
        Sub.none

    else
        Time.every 1000 Tick


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick newTime ->
            ( { model | time = newTime }, Cmd.none )

        Stop predicate ->
            ( { model | stop = predicate }, Cmd.none )


view : Model -> Html Msg
view model =
    div []
        [ button [] [ text (String.fromInt (Time.toSecond Time.utc model.time)) ]
        ]
