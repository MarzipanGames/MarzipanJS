import Engine from './core/engine';
import Assets from './core/assets';
import ENSURE from './utils/ensure';

import Input from './core/input';
import Screen from './graphics/screen';
import WebRenderer from './graphics/web/webrenderer';
import GLRenderer from './graphics/gl/glrenderer';

import Random from './math/random';
import Dispatcher from './core/dispatcher';


//default asset loaders
import YamlLoader from './io/loaders/yamlloader';
import PlainLoader from './io/loaders/plainloader';
import JsonLoader from './io/loaders/jsonloader';
import PictureLoader from './io/loaders/pictureloader';
import AudioLoader from './io/loaders/audioloader';

//default controllers
import KeyboardSystem from './io/inputsystems/keyboardsystem';
import TouchSystem from './io/inputsystems/touchsystem';


let renderer;

let random = new Random();
let eventDispatcher = new Dispatcher();

let init = function (settings) {
    ENSURE(settings);
    //init asssets and loaders
    Assets.init(settings.assets || {});
    Assets.addLoader(new PlainLoader());
    Assets.addLoader(new YamlLoader());
    Assets.addLoader(new JsonLoader());
    Assets.addLoader(new PictureLoader());
    Assets.addLoader(new AudioLoader());

    //init graphics (renderer)
    Screen.init(settings.screen || {});
    renderer = new WebRenderer({
        screen: Screen
    });

    //init controllers
    Input.init(settings.input || {});
    Input.addSystem(new KeyboardSystem());
    Input.addSystem(new TouchSystem());

    Engine.init(settings.engine || {});
};

let Marzipan = {
    init
};

Object.defineProperties(Marzipan, {
    engine: {
        get: () => Engine
    },
    assets: {
        get: () => Assets
    },
    renderer: {
        get: () => renderer
    },
    input: {
        get: () => Input
    },
    screen: {
        get: () => Screen
    },
    random: {
        get: () => random
    },
    events: {
        get: () => eventDispatcher
    }
});

export default Marzipan;