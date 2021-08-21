module Main exposing (Model, init, main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Time



-- Goal:
-- StopWatch
-- 1. PLAY
-- 2. LOG
-- Acceptance Tests:
-- 1. As a user, when I click the "LOG" button,
-- I would like a modal to pop up asking for the symptom name


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- Declare types


type alias Name =
    String


type alias StartTime =
    Float


type alias EndTime =
    Float


type TimeLog
    = PartialLog Name StartTime
    | CompleteLog Name StartTime EndTime



-- MODEL


type alias Model =
    { logs : List TimeLog
    , time : Time.Posix
    }


type Msg
    = Tick Time.Posix
    | TimeLog


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model [] (Time.millisToPosix 0), Cmd.none )
