/*
 * Official Web Page
 * <https: //kagedesuworkshop.blogspot.com/p/alpha-net.html>
 *
 * License
 * Creative Commons 4.0 Attribution, Share Alike, Non-Commercial
 * <https://creativecommons.org/licenses/by-nc-sa/4.0/>
 *
 * Copyright (c) 2018 Vladimir Skrypnikov (Pheonix KageDesu)
 * <https://kagedesuworkshop.blogspot.ru/>
 *
 */

//=============================================================================
// Alpha_NET
//=============================================================================

/*:
 * @author Pheonix KageDesu
 * @plugindesc v0.7.900 Network system (Beta)
 * @help
 * 
 * Web Page: 
 * https://kagedesuworkshop.blogspot.com/p/alpha-net.html
 * Wiki Page: 
 * https://github.com/KageDesu/AlphaNET/wiki
 * Patreon Page: 
 * https://www.patreon.com/KageDesu
 * YouTube Channel:
 * https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 * 
 * Thanks to all my patrons!
 * Plugin supporters:
 *  - Donald Derrick
 *  - Ilya Chkoliar (https://elushisgaming.club/)
 *  - Kevin Sjöberg
 *  - Sarcastic Sloth (https://sarcasticsloth42.wixsite.com/avillainstale)
 *  - Plerai
 * 
 * ==============================================================
 * Plugin Commands
 * ==============================================================
 *  --- Game Host ---
 * NET start - start server (only for PC)
 * NET hotSeat - start split screen
 *    (server must be started on your PC first)
 * NET stop - stop server
 * 
 * NET restrict - disable connection other players to the game
 * NET allow - enable connection to the game
 * 
 *  --- Game Client ---
 * NET connect - join to the game
 * NET disconnect - left the game
 * 
 * [!] Please read Wiki Page for more information and documentation
 * 
 * === === === === === === === === === === === === === === === === ===
 * 
 * @param Alpha NET
 * 
 * @param GameMode
 * @parent Alpha NET
 * @type combo
 * @text Game Mode
 * @option Cooperative
 * @option Multiplayer
 * @default Cooperative
 * @desc Read more about game modes on Wiki Page
 * 
 * @param ActorsForPlayers
 * @parent Alpha NET
 * @text Actors for players
 * @type string
 * @default 1, 2, 3, 4
 * @desc Actor ID for each player, separate by comma. Actors count = how many players can join to the game
 * 
 * @param NetworkEvents
 * @text Network Events
 * @parent Alpha NET
 * @type string
 * @default --- --- --- --- ---
 * 
 * @param ServerStarted
 * @text On Server Started
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when Server get started (only for host)
 * 
 * @param OnConnect
 * @text On Join
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when you join the game
 * 
 * @param OnDisconect
 * @text On Disconect
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when you lost connection with game
 * 
 * @param OnOtherCon
 * @text On Another Join
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when another player join your game
 * 
 * @param OnOtherDisc
 * @text On Another Left
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when another player left your game
 * 
 * @param OnPvPEnd
 * @text On PvP Battle End
 * @parent NetworkEvents
 * @type number
 * @default 0
 * @desc CommonEvent ID, called when PvP battle ends (only for PvP participants)
 * 
 * @param NetworkUI
 * @text UI Settings
 * @parent Alpha NET
 * @type string
 * @default --- --- --- --- ---
 * 
 * @param NameplatesMode
 * @parent NetworkUI
 * @type combo
 * @text Nameplate display mode
 * @option Others
 * @option All
 * @option Never
 * @default Others
 * @desc How display players names above characters
 * 
 * @param _supporters
 * @text Plugin Supporters
 * @default Thanks to these guys!
 * 
 * @param Donald Derrick
 * @parent _supporters
 * @desc https://www.patreon.com/user/creators?u=4416500
 * 
 * @param Ilya Chkoliar
 * @default https://elushisgaming.club/
 * @parent _supporters
 * @desc https://www.patreon.com/elushisgaming
 * 
 * @param Kevin Sjöberg
 * @parent _supporters
 * @desc https://www.patreon.com/user/creators?u=14901397
 * 
 * @param Sarcastic Sloth
 * @parent _supporters
 * @default https://sarcasticsloth42.wixsite.com/avillainstale
 * @desc https://www.patreon.com/user/creators?u=12796212
 * 
 * @param Plerai
 * @parent _supporters
 * @desc https://www.patreon.com/Plerai/creators
 * 
 */

//Show NET Icons?
//Show ICON while Chat?
//Show ICON while Wait?
//Show ICON while Menu?
//PICs for All Three Icons (стандартные хранить в памяти?)


//@[CODE STANDARD X2]

/* jshint -W097 */
/* jshint -W117 */

"use strict";

var Imported = Imported || {};
Imported.AlphaNET = true;

var AlphaNET = {};
AlphaNET.Version = '0.7';
AlphaNET.Build = 900;

AlphaNET.Versions = {
    'KDCore': '1.2',
    'NET': AlphaNET.Version + ' : ' + AlphaNET.Build,
    'Socket.io': '2.0.4',
    'CoffeeScript CLI': '2.3.1'
};

AlphaNET.LIBS = {};

AlphaNET.register = function (library) {
    this.LIBS[library.name] = library;
};

// * Global LOG
var LOGW = {};

// ------------------------- MAIN MODULES ---------------------------------
function Network() {
    throw new Error('This is a static class');
}

function NetPartyManager() {
    throw new Error('This is a static class');
}

function MakerManager() {
    throw new Error('This is a static class');
}

function HotSeatKeyMapper() {
    throw new Error('This is a static class');
}

function NetWorldManager() {
    throw new Error('This is a static class');
}

function InfoPrinter() {
    throw new Error('This is a static class');
}

function JSONManagerNET() {
    throw new Error('This is a static class');
}
// -------------------------------------------------------------------------

//@[GLOBAL DEFINITON]
function executeFunctionByName(functionName, context /*, args */ ) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

function showDebugConsole() {
    if (!Utils.isNwjs()) return;
    require('nw.gui').Window.get().showDevTools();
}

(function () {
    //@[ALIAS]
    var _SceneManager_catchException_NET = SceneManager.catchException;
    SceneManager.catchException = function (e) {
        SceneManager._printErrorInfoNET();
        _SceneManager_catchException_NET.call(this, e);
    };

    //?[NEW]
    SceneManager._printErrorInfoNET = function () {
        console.error("Using Alpha NET [Version: " + AlphaNET.Version + " ; Build: " + AlphaNET.Build + " ; on MV  " + Utils.RPGMAKER_VERSION + "]");
    };

    //@[ALIAS]
    var _SceneManager_onError_ABS = SceneManager.onError;
    SceneManager.onError = function (e) {
        SceneManager._printErrorInfoNET();
        showDebugConsole();
        _SceneManager_onError_ABS.call(this, e);
    };

    // * Данный метод отвечает чтобы при загрузке сохранённой игры нашлись классы библиотек
    //@[ALIAS]
    var _JsonEx_decode = JsonEx._decode;
    JsonEx._decode = function (value, circular, registry) {
        var type = Object.prototype.toString.call(value);
        if (type === '[object Object]' || type === '[object Array]') {
            if (value['@']) {
                var constructor = AlphaNET.LIBS[value['@']] || KDCore[value['@']];
                if (constructor) {
                    value = this._resetPrototype(value, constructor.prototype);
                    value['@'] = null;
                }
            }
        }
        return _JsonEx_decode.call(this, value, circular, registry);
    };
})();
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var KDCore;

KDCore = KDCore || {};

KDCore.Version = '1.2';

KDCore.LIBS = {};

KDCore.register = function(library) {
  return this.LIBS[library.name] = library;
};

(function() {
  var BitmapSrc, Color, DevLog, ParametersManager, SDK, StringsLoader, __TMP_LOGS__;
  //Array Extension
  //------------------------------------------------------------------------------
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.include = function(value) {
    return this.indexOf(value) !== -1;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  //Number Extension
  //------------------------------------------------------------------------------
  Number.prototype.do = function(method) {
    return SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  //Sprite Extension
  //------------------------------------------------------------------------------
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX, floatY) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  //Bitmap Extension
  //------------------------------------------------------------------------------
  Bitmap.prototype.fillAll = function(color) {
    return this.fillRect(0, 0, this.width, this.height, color.CSS);
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    return this.drawOnMe(bitmap, x, y, size, size);
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
  //String Extenstion
  //------------------------------------------------------------------------------
  String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
  //SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  //Color
  //------------------------------------------------------------------------------
  Color = class Color {
    constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
      this.r = r1;
      this.g = g1;
      this.b = b1;
      this.a = a1;
    }

    getLightestColor(lightLevel) {
      var bf, newColor, p;
      bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
      p = 0;
      newColor = [0, 0, 0, 0];
      if (bf - lightLevel >= 0) {
        if (bf >= 0) {
          p = Math.abs(bf - lightLevel) / lightLevel;
        }
        newColor = this.ARR.map(function(c) {
          return c - (p * c);
        });
      } else {
        if (bf >= 0) {
          p = (lightLevel - bf) / (255 - bf);
        }
        newColor = this.ARR.map(function(c) {
          return [(255 - c) * p + c, 255].min();
        });
      }
      return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
    }

    clone() {
      return this.reAlpha(this.a);
    }

    reAlpha(newAlpha) {
      return new Color(this.r, this.g, this.b, newAlpha || 255);
    }

    static AddConstantColor(name, color) {
      color.toHex();
      color.toArray();
      color.toCSS();
      SDK.setConstantToObject(Color, name, color);
    }

    toHex() {
      var b, g, r;
      if (this._colorHex != null) {
        return this._colorHex;
      }
      r = Math.floor(this.r).toString(16).padStart(2, "0");
      g = Math.floor(this.g).toString(16).padStart(2, "0");
      b = Math.floor(this.b).toString(16).padStart(2, "0");
      return this._colorHex = '#' + r + g + b;
    }

    toArray() {
      if (this._colorArray != null) {
        return this._colorArray;
      }
      return this._colorArray = [this.r, this.g, this.b, this.a];
    }

    toCSS() {
      var na, nb, ng, nr;
      if (this._colorCss != null) {
        return this._colorCss;
      }
      nr = Math.round(this.r);
      ng = Math.round(this.g);
      nb = Math.round(this.b);
      na = this.a / 255;
      return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
    }

    static Random() {
      var a, b, c;
      a = SDK.rand(1, 254);
      b = SDK.rand(1, 254);
      c = SDK.rand(1, 254);
      return new Color(a, b, c, 255);
    }

    static FromHex(hexString) {
      var color, result;
      result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
      color = null;
      if (result != null) {
        color = {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        };
      }
      if (color != null) {
        return new Color(color.r, color.g, color.b, 255);
      } else {
        return Color.NONE;
      }
    }

  };
  Object.defineProperties(Color.prototype, {
    R: {
      get: function() {
        return this.r;
      },
      configurable: true
    },
    G: {
      get: function() {
        return this.g;
      },
      configurable: true
    },
    B: {
      get: function() {
        return this.b;
      },
      configurable: true
    },
    A: {
      get: function() {
        return this.a;
      },
      configurable: true
    },
    ARR: {
      get: function() {
        return this.toArray();
      },
      configurable: true
    },
    CSS: {
      get: function() {
        return this.toCSS();
      },
      configurable: true
    },
    HEX: {
      get: function() {
        return this.toHex();
      },
      configurable: true
    }
  });
  Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));
  Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));
  Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));
  Color.AddConstantColor('RED', new Color(255, 0, 0, 255));
  Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));
  Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));
  Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));
  Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));
  Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));
  Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));
  //DevLog
  //------------------------------------------------------------------------------
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.WHITE);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  BitmapSrc = (function() {
    //BitmapSrc
    //------------------------------------------------------------------------------
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          pw = Window_Base._iconWidth;
          ph = Window_Base._iconHeight;
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //ParametersManager
  //------------------------------------------------------------------------------
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] !== void 0;
  };
  ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

  };
  //StringsLoader
  //------------------------------------------------------------------------------
  StringsLoader = class StringsLoader {
    constructor(_parameters) {
      this._parameters = _parameters;
    }

    loadAllStringsToObject(object) {
      var strings;
      strings = this._collect(object);
      this._writeNewString(object, strings);
    }

    _collect(object) {
      var properties, strings;
      properties = Object.getOwnPropertyNames(object);
      strings = properties.filter(function(item) {
        return item.includes("STRING_");
      });
      return strings;
    }

    _writeNewString(object, strings) {
      var j, len, string;
      for (j = 0, len = strings.length; j < len; j++) {
        string = strings[j];
        this._setStringFromPluginParametersToObject(object, string);
      }
    }

    _setStringFromPluginParametersToObject(object, stringName) {
      var newValue;
      newValue = this._parameters[stringName];
      if (newValue) {
        object[stringName] = newValue;
      }
    }

  };
  //EXTENSION TO GLOBAL
  //------------------------------------------------------------------------------
  KDCore.SDK = SDK;
  KDCore.Color = Color;
  KDCore.DevLog = DevLog;
  KDCore.BitmapSrc = BitmapSrc;
  KDCore.ParametersManager = ParametersManager;
  KDCore.StringsLoader = StringsLoader;
})();

// ■ END KDCore.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DevExt.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var __TMP_LOG__;
  __TMP_LOG__ = null;
  String.prototype.LOG = function() {
    if (__TMP_LOG__ === null) {
      __TMP_LOG__ = new KDCore.DevLog("TMP");
      __TMP_LOG__.setColors(KDCore.Color.WHITE, KDCore.Color.BLACK.getLightestColor(20));
    }
    __TMP_LOG__.p(this);
  };
  Number.prototype.LOG = function() {
    return this.toString().LOG();
  };
  Array.prototype.LOG = function() {
    return this.toString().LOG();
  };
  Boolean.prototype.LOG = function() {
    return this.toString().LOG();
  };
  String.prototype.P = function() {
    return this.LOG();
  };
  String.prototype.p = function(additionText) {
    var str;
    if (additionText != null) {
      str = this + " : " + additionText;
      return str.LOG();
    } else {
      return this.LOG();
    }
  };
  Array.prototype.findElementByField = function(elementField, value) {
    var result;
    result = this.filter(function(item) {
      return item[elementField] === value;
    });
    if (result.length === 0) {
      return null;
    } else {
      return result[0];
    }
  };
  Array.prototype.findElementIndexByField = function(elementField, value) {
    var element;
    element = this.findElementByField(elementField, value);
    return this.indexOf(element);
  };
})();

// ■ END DevExt.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkClient.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var LOG, NetworkClient, _C, _M, _R;
  LOG = new KDCore.DevLog(" * Client");
  LOG.setColors(KDCore.Color.MAGENTA.reAlpha(200), KDCore.Color.BLACK.getLightestColor(200));
  LOG.on();
  //@[DEFINES]
  _C = null; //? ClientManager
  _M = null; //? NetMessage
  _R = null; //? _registerNetMessage
  NetworkClient = class NetworkClient {
    constructor(socket) {
      this.socket = socket;
      _R = this._registerNetMessage.bind(this);
      _M = NetMessage;
      _C = AlphaNET.LIBS.ClientManager;
      NetMessage.Setup(this.socket);
      this._handleCommands();
    }

    _handleCommands() {
      this._handleError();
      this._handleConnect();
      this._handleDisconect();
      return this._handleNET();
    }

    _handleError() {
      return this.socket.on('connect_error', function() {
        LOG.p('Connect error!');
        Network.onConnectionError();
        return Network.disconnect();
      });
    }

    _handleConnect() { // * WHEN THIS CLIENT CONNECT TO SERVER
      return this.socket.on('connect', function() {
        LOG.p('Connected');
        Network.runEvent(Network.commonEventOnConnectToServer);
        return Network.onConnectToServer();
      });
    }

    _handleDisconect() { // * WHEN SERVER TURN OFF
      return this.socket.on('disconnect', function() {
        LOG.p('Disconnected');
        NetPartyManager.clearParty();
        Network.runEvent(Network.commonEventOnDisconectFromServer);
        return Network.onConnectionLost();
      });
    }

    _handleNET() {
      this.socket.on('trace', function() { // * Используется для теста соединения
        return LOG.p("Trace from Server");
      });
      _R(_M.AlertMessage(), function(netData) {
        return window.alert(netData.data);
      });
      _R(_M.PlayerConnect(), _C.OnAnotherConnected);
      _R(_M.PlayerDisconnect(), _C.OnAnotherDisconnected);
      _R(_M.HostResponse(), _C.OnHostResponse);
      _R(_M.PlayersTableResponse(), _C.SetPlayersTableData);
      _R(_M.RequestPlayerData(), _C.OnAnotherPlayerDataRequested);
      _R(_M.PlayerDataResponse(), _C.OnAnotherPlayerDataResponse);
      _R(_M.PlayerMoveData(), _C.OnAnotherPlayerMove);
      _R(_M.MapEventMoveData(), _C.OnEventMoveData);
      _R(_M.WindowSelect(), _C.OnWindowSelectData);
      _R(_M.BattleInputCommand(), _C.OnBattleInputCommand);
      _R(_M.TempMessage(), _C.OnTempMessage);
      _R(_M.SyncEvent(), _C.OnEventSync);
      _R(_M.LockEvent(), _C.OnEventLock);
      _R(_M.OwnEvent(), _C.OnEventOwned);
      _R(_M.StartSharedEvent(), _C.OnStartSharedEvent);
      _R(_M.BattleBattlerRefreshData(), _C.OnBattleBattlerRefreshCommand);
      _R(_M.BattleAction(), _C.OnBattleActionCommand);
      _R(_M.BattleManager(), _C.OnBattleManagerCommand);
      _R(_M.PlayerNetIcon(), _C.OnPlayerNetIcon);
      _R(_M.VirtualInterpreter(), _C.OnVirtualIterpreterCommand);
      _R(_M.PlayerNetActorData(), _C.OnPlayerNetActorData);
      _R(_M.HostGameMapId(), _C.OnHostGameMapId);
      _R(_M.PlayerWorldData(), _C.OnPlayerWorldData);
      _R(_M.GlobalWorldData(), _C.OnGlobalWorldData);
      _R(_M.PlayerNetMapData(), _C.OnPlayerNetMapData);
      _R(_M.RequestGameMapEventsData(), _C.OnRequestGameMapEventsDataFromServer);
      _R(_M.GameMapEventsDataResponse(), _C.OnResponseGameMapEventsDataFromServer);
      _R(_M.SetOwner(), _C.OnSetOwner);
      _R(_M.CallUApi(), _C.OnUserApiCommand);
      _R(_M.StartPvPBattle(), _C.OnStartPvPBattle);
      _R(_M.BattleManagerPvP(), _C.OnBattleManagerPvPCommand);
      
      // * При завершени ожидания сервера
      this.socket.on(_M.OnWaitResponse().name, function(data) {
        return Network.onServerResponse(data);
      });
      
      //?{TEST}
      return this.socket.on('123', function(data) {
        if ((data != null ? data.waited : void 0) === true) {
          return Network.onServerResponse();
        }
      });
    }

    _registerNetMessage(netMessage, func) {
      return this.socket.on(netMessage.name, func);
    }

    _requestPlayersInitialData() {
      return _M.RequestPlayerData().send();
    }

    disconnect() {
      _C.OnDisconnect();
      if (this.socket != null) {
        return this.socket.disconnect();
      }
    }

  };
  AlphaNET.register(NetworkClient);
})();

// ■ END NetworkClient.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkServer.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//* ================ HELP SECTION =================
//client.emit('testX') #ТОЛЬКО ЭТОМУ
//this._server.emit('testX') #ВСЕМ
//client.broadcast.emit('testX') #ВСЕМ, КРОМЕ СЕБЯ

//Как создавать новую команду
//1 - Создаём NetMessage
//2 - Прописываем команду в NetworkServer.coffee
//3 - Прописываем команду в NetworkClient.coffee
//4 - Прописываем логику команды в ClientManager (если это сообщение от сервера)
//5 - Прописываем логику в ServerManager (если это сообщение от клиента к сереру)
//* ==============================================
(function() {
  var LOG, NetworkServer, ServerManager, _M, _R, _RT;
  LOG = new KDCore.DevLog("Server");
  LOG.setColors(KDCore.Color.GREEN, KDCore.Color.BLACK.getLightestColor(120));
  LOG.on();
  //@[DEFINES]
  _M = null; //? NetMessage
  _R = null; //? _registerNetMessage
  _RT = null; //? _retranslate
  ServerManager = null;
  NetworkServer = class NetworkServer {
    constructor(port) {
      this.port = port;
      _M = NetMessage;
      _R = this._registerNetMessage.bind(this);
      _RT = this._retranslate.bind(this);
      ServerManager = AlphaNET.LIBS.ServerManager;
      this._host = null;
      this._startServer();
      ServerManager.Init(this);
      this._handleCommands();
    }

    _startServer() {
      var path;
      path = './js/libs/server';
      this._server = require(path)(this.port);
      Network.runEvent(Network.commonEventOnServerStarted);
      InfoPrinter.p('<font color="blue" size="3">Server started</font>');
      setTimeout(InfoPrinter.clear, 3000);
      return LOG.p("started");
    }

    _handleCommands() {
      return this._server.on('connection', (client) => { // * WHEN ANOTHER CLIENT CONNECTS TO THIS SERVER
        LOG.p("Client connected " + client.id);
        this._handleDisconnect(client);
        this._setupServerCommands(client);
        return this._registerConnection(client);
      });
    }

    _handleDisconnect(client) { // * WHEN ANOTHER CLIENT GONE FROM THIS SERVER
      return client.on('disconnect', function() {
        LOG.p("Client disconnected " + client.id);
        return ServerManager.OnClientDisconnect(client);
      });
    }

    _registerConnection(client) {
      "REGISTER CONNECTION".p();
      if (!this._isHostExists()) {
        return this._registerHost(client);
      } else {
        return ServerManager.OnNewPlayerConnected(client);
      }
    }

    _isHostExists() {
      return this._host !== null;
    }

    _registerHost(client) {
      this._host = client;
      LOG.p("Host is " + client.id);
      //TODO: Это не обязательно, так как Хост = этому клиенту, можно сразу на NEtwork Установить
      NetMessage.HostResponse(client).send();
      return ServerManager.RegisterHost(client);
    }

    _setupServerCommands(client) {
      var e;
      try {
        // * Эти команды ретранслируются
        _RT(client, _M.RequestPlayerData());
        _RT(client, _M.PlayerDataResponse());
        _RT(client, _M.PlayerMoveData());
        _RT(client, _M.MapEventMoveData());
        _RT(client, _M.WindowSelect());
        _RT(client, _M.BattleInputCommand());
        _RT(client, _M.TempMessage());
        _RT(client, _M.LockEvent());
        _RT(client, _M.OwnEvent());
        _RT(client, _M.BattleBattlerRefreshData());
        _RT(client, _M.BattleAction());
        _RT(client, _M.BattleManager());
        _RT(client, _M.PlayerNetIcon());
        _RT(client, _M.PlayerNetActorData());
        _RT(client, _M.PlayerNetMapData());
        _RT(client, _M.CallUApi());
        // * Эти команды выполняются только на сервере
        _R(client, _M.RegisterOnSharedEvent(), ServerManager.RegisterOnSharedEvent);
        _R(client, _M.RegisterOnSharedEventSync(), ServerManager.RegisterOnSharedEventSync);
        _R(client, _M.RequestSync(), ServerManager.RegisterOnSync);
        _R(client, _M.PlayerWorldData(), ServerManager.OnPlayerWorldData);
        _R(client, _M.PlayerNetItemsData(), ServerManager.OnPlayerNetItemsData);
        _R(client, _M.RequestGameMapEventsData(), ServerManager.OnPlayerRequestMapData);
        _R(client, _M.GameMapEventsDataResponse(), ServerManager.OnMapDataResonpse);
        _R(client, _M.PlayerChangeMap(), ServerManager.OnPlayerChangeMap);
        _R(client, _M.RequestPvP(), ServerManager.OnPlayerRequestPvPWithAnother);
        _R(client, _M.BattleManagerPvP(), ServerManager.OnBattleManagerPvPCommand);
        // * Эти команды ретранслируются, а также выполняются на сервере
        _RT(client, _M.StartSharedEvent());
        _R(client, _M.StartSharedEvent(), ServerManager.StartSharedEvent);
        _RT(client, _M.SyncEvent());
        _R(client, _M.SyncEvent(), ServerManager.OnSyncEvent);
        _RT(client, _M.VirtualInterpreter());
        _R(client, _M.VirtualInterpreter(), ServerManager.OnVirtualInterpreter);
      } catch (error) {
        e = error;
        LOG.p(' ! ! ! Server CMD Error');
        Network.error(e, ' on Server commands');
      }
      //?{TEST}
      //client.on _M.TempMessage().name, (data) ->
      //    LOG.p('123')
      //    _M.TempMessage(client).send(data.data)
      //    _M.TempMessage(client).broadcast(data.data)

      //@_registerNetMessage client, 'testWaitHard', -> LOG.p('hard wait accepted')

      //?{TEST}
      client.on('testWaitHard', function(data) {
        return LOG.p('hard wait accepted ' + data.data);
      });
      //?{TEST}
      return client.on('testWaitHardRepeated', function(data) {
        return LOG.p('hard repeat wait accepted ' + data.data);
      });
    }

    // * Этот метод перенаправляет команду от сервера на все клиенты (кроме клиента, который прислал эту команду)
    _retranslate(client, netCommand) {
      return _R(client, netCommand, function(networkData) {
        netCommand.socket = client;
        netCommand.setFrom(client.id);
        return netCommand.broadcast(networkData.data);
      });
    }

    _registerNetMessage(client, netMessage, func) {
      return client.on(netMessage.name, func);
    }

    instance() {
      return this._server;
    }

    isStarted() {
      return this.instance() != null;
    }

    onWaitPoolReady(data) {
      return this._server.emit(_M.OnWaitResponse().name, data);
    }

    abortWaitPool(clientId, code) {
      var client;
      client = this._getClientById(clientId);
      return client != null ? client.emit(_M.OnWaitResponse().name, code) : void 0;
    }

    _getClientById(clientId) {
      return this.clients()[clientId];
    }

    //?{TEST}
    test() {
      return this._server.emit('123', {
        waited: true
      });
    }

    stop() {
      var ref;
      if ((ref = this._server) != null) {
        ref.close();
      }
      this._server = null;
      return LOG.p("stopped");
    }

    clients() {
      return this._server.clients().sockets;
    }

    clientsCount() {
      return Object.keys(this.clients()).length;
    }

  };
  AlphaNET.register(NetworkServer);
})();

// ■ END NetworkServer.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var _0x2f40 = [
    '_tp',
    '_states',
    'states',
    '_moveCharacterFromNetwork',
    'onNetworkCharacterData',
    'charData',
    'While\x20moving\x20character',
    'rKInN',
    'actorItems',
    'actorData',
    'onWorldDataFromNetwork',
    'event',
    'iGBiu',
    'ikjFL',
    'subjectData',
    'targetData',
    '_actionEndPvPFromNetwork',
    'moveData',
    'uNgZX',
    'QiztI',
    'directionData',
    'kUPBY',
    'While\x20try\x20synchronize\x20another\x20actor\x20data',
    'While\x20moving\x20event',
    'OnWindowSelectData',
    'networkWSelectedIndex',
    'index',
    'fglJr',
    'MxoLm',
    '_outerStartPvP',
    'networkWAction',
    'action',
    'EVENT\x20SYNC\x20COMMAND',
    'VnTAI',
    'YMAcY',
    'executeSyncCommandFromNetwork',
    'read\x20event\x20sync\x20data',
    'OnEventLock',
    'iJIYM',
    'gAVmu',
    'clearResult',
    'OnEventOwned',
    'YvQei',
    'getPlayer',
    'OnStartSharedEvent',
    'startEventFromNetwork',
    'DvRSK',
    'read\x20shared\x20event\x20data',
    'OnBattleInputCommand',
    'BATTLE\x20:\x20ON\x20INPUT\x20COMMAND',
    'BATTLE\x20:\x20ACTOR\x20REFRESH',
    'getBattleSubjectById',
    'BATTLE\x20:\x20GAME\x20ACTION',
    'setResult',
    'sbj',
    'target',
    'setupFromOuterData',
    'result',
    '_result',
    'memberByActorId',
    'currentAction',
    'setSkill',
    'Vkwqf',
    'YZyXK',
    'setSkillFromNet',
    'actionId',
    'START\x20SHARED\x20EVENT\x20FROM\x20NETWORK',
    'setItem',
    'RFAQM',
    'jtEcX',
    'setItemFromNet',
    'setTargetFromNet',
    'OnBattleManagerCommand',
    'BATTLE\x20:\x20MANAGER',
    'battleOrder',
    '_actionBattlers',
    'convertIdsToBattlers',
    'orderData',
    'enemyIds',
    'troopIds',
    'endAction',
    'kxYYr',
    '_abortBattleCommandFromNetwork',
    'endTurn',
    'processTurn',
    '_processTurnFromNetwork',
    'subjectId',
    'oStbE',
    '_startActionFromNetwork',
    'targets',
    'NgtIb',
    '_invokeNormalActionFromNetwork',
    'read\x20Window\x20Select\x20Data\x20from\x20Server',
    'victory',
    'processVictory',
    'defeat',
    'processDefeat',
    'escape',
    'success',
    'OnPlayerNetIcon',
    'While\x20responde\x20game\x20map\x20data\x20from\x20server',
    'inBattle',
    'hteEQ',
    'WvjtP',
    'reserveTransfer',
    'showNetworkIcon',
    'OnVirtualIterpreterCommand',
    'VIRTUAL\x20INTERPRETER',
    '_params',
    'parameters',
    '_mapId',
    '_eventId',
    'command',
    'function',
    'JPHlF',
    'vmfQo',
    'onActroItemsFromNetwork',
    'While\x20try\x20load\x20player\x20world\x20data\x20from\x20server',
    'terminate',
    'While\x20try\x20execute\x20virtual\x20command',
    'TEMP\x20MESSAGE\x20:\x20NETWORK\x20DATA',
    'OnPlayerNetActorData',
    'onActorDataFromNetwork',
    'sessionData',
    'setPlayerActorData',
    'While\x20try\x20save\x20another\x20actor\x20data',
    'OnHostGameMapId',
    'OnPlayerWorldData',
    'OnGlobalWorldData',
    'onGlobalWorldDataFromNetwork',
    'While\x20try\x20load\x20global\x20world\x20data\x20from\x20server',
    'OnPlayerNetMapData',
    'qCabU',
    'FWjcK',
    'OnRequestGameMapEventsDataFromServer',
    'gejkF',
    'collectDataForNetwork',
    'GameMapEventsDataResponse',
    'OnResponseGameMapEventsDataFromServer',
    'MiVgA',
    'mapData',
    'synchronizeFromNetwork',
    'MgmLt',
    'OnSetOwner',
    'I\x20map\x20owner!',
    '_isMapOwner',
    'feqPh',
    'rvyLY',
    'While\x20execute\x20uAPI\x20network\x20command',
    'OnStartPvPBattle',
    'OnBattleManagerPvPCommand',
    'AYaYF',
    'BATTLE\x20:\x20MANAGER\x20PVP:\x20CLIENT',
    'inputActionPvP',
    'startTurnPvP',
    'invokeNormalActionPvP',
    'vDyOX',
    'resultSubject',
    'resultTarget',
    'targetId',
    'endActionPvP',
    'while\x20accept\x20Battle\x20Manager\x20PvP\x20Command',
    'OnHostResponse',
    'setHost',
    'OnAnotherConnected',
    'runEvent',
    'commonEventOnOtherClientConnected',
    'OnAnotherDisconnected',
    'playerData',
    'from',
    'removePlayer',
    'commonEventOnOtherClientDisconected',
    'SetPlayersTableData',
    'isHost',
    'players',
    'data',
    'myPlayerData',
    'myId',
    'refreshParty',
    'SetupVirtualUpdate',
    'RequestPlayerData',
    'send',
    'RequestGameMapEventsData',
    'mapId',
    'PlayerChangeMap',
    '_virtualUpdateThread',
    'dcOEY',
    'EVENT\x20OWN\x20COMMAND',
    'eventId',
    'isLock',
    'error',
    'synchronize',
    'yQTTV',
    'DdWcu',
    'parse',
    '_setPvPRivalActionFromNetwork',
    'SERVER_UPDATE_TIME',
    'OnAnotherPlayerDataRequested',
    'PlayerDataResponse',
    'OnAnotherPlayerDataResponse',
    'PLAYER\x20DATA\x20FROM',
    'AfJVI',
    'getCharById',
    'While\x20character\x20synchronization',
    'isTkT',
    'alIwD',
    '_hp'
];
(function (_0xfb833e, _0xd7aeac) {
    var _0x2398c7 = function (_0x1c1a1d) {
        while (--_0x1c1a1d) {
            _0xfb833e['push'](_0xfb833e['shift']());
        }
    };
    _0x2398c7(++_0xd7aeac);
}(_0x2f40, 0xa2));
var _0x5701 = function (_0x1caa1b, _0x10f3e3) {
    _0x1caa1b = _0x1caa1b - 0x0;
    var _0x4ea2b7 = _0x2f40[_0x1caa1b];
    return _0x4ea2b7;
};
var ClientManager;
ClientManager = class ClientManager {
    static [_0x5701('0x0')]() {
        return Network[_0x5701('0x1')]();
    }
    static [_0x5701('0x2')](_0x2ad0a8) {
        return Network[_0x5701('0x3')](Network[_0x5701('0x4')]);
    }
    static [_0x5701('0x5')](_0x459549) {
        if (!Network[_0x5701('0x6')](_0x459549[_0x5701('0x7')])) {
            return;
        }
        NetPartyManager[_0x5701('0x8')](_0x459549[_0x5701('0x7')]);
        return Network[_0x5701('0x3')](Network[_0x5701('0x9')]);
    }
    static [_0x5701('0xa')](_0x2dbd22) {
        if (!Network[_0x5701('0xb')]()) {
            Network[_0x5701('0xc')] = _0x2dbd22[_0x5701('0xd')];
            Network[_0x5701('0xe')] = Network[_0x5701('0x6')](Network[_0x5701('0xf')]());
        }
        NetPartyManager[_0x5701('0x10')]();
        ClientManager[_0x5701('0x11')]();
        NetMessage[_0x5701('0x12')]()[_0x5701('0x13')]();
        if (!Network[_0x5701('0xb')]()) {
            NetMessage[_0x5701('0x14')]()[_0x5701('0x13')]($gameMap[_0x5701('0x15')]());
            return NetMessage[_0x5701('0x16')]()['send']($gameMap['mapId']());
        }
    }
    static [_0x5701('0x11')]() {
        var _0xa253ec;
        if (ClientManager[_0x5701('0x17')] != null) {
            if (_0x5701('0x18') === 'dcOEY') {
                return;
            } else {
                var _0x15a854, _0x493339;
                try {
                    _0x5701('0x19')['p']();
                    _0x15a854 = networkData['data'];
                    if ($gameMap[_0x5701('0x15')]() !== _0x15a854['mapId']) {
                        return;
                    }
                    return $gameMap['setOwnedEventByNetwork'](_0x15a854[_0x5701('0x1a')], _0x15a854[_0x5701('0x1b')]);
                } catch (_0x117f2c) {
                    _0x493339 = _0x117f2c;
                    return Network[_0x5701('0x1c')](_0x493339, 'read\x20event\x20sync\x20data');
                }
            }
        }
        return ClientManager['_virtualUpdateThread'] = setTimeout(_0xa253ec = function () {
            if (!Network['isConnected']()) {
                return;
            }
            NetPartyManager[_0x5701('0x1d')]();
            NetWorldManager['synchronize']();
            if (ClientManager['_virtualUpdateThread'] != null) {
                if (_0x5701('0x1e') === _0x5701('0x1f')) {
                    action = JsonEx[_0x5701('0x20')](data['action']);
                    BattleManager[_0x5701('0x21')](action);
                    return;
                } else {
                    return ClientManager['_virtualUpdateThread'] = setTimeout(_0xa253ec, Network[_0x5701('0x22')]);
                }
            }
        }, Network['SERVER_UPDATE_TIME']);
    }
    static [_0x5701('0x23')](_0x338267) {
        NetMessage[_0x5701('0x24')]()['send']($gamePlayer['collectDataForNetwork']());
        return NetPartyManager[_0x5701('0x1d')]();
    }
    static [_0x5701('0x25')](_0x19d817) {
        var _0x495ce0, _0x363348;
        _0x5701('0x26')['p'](_0x19d817['from']);
        try {
            if (_0x5701('0x27') !== 'AfJVI') {
                return Network[_0x5701('0x1')]();
            } else {
                _0x495ce0 = NetPartyManager[_0x5701('0x28')](_0x19d817['from']);
                return _0x495ce0 != null ? _0x495ce0['synchronizeFromNetwork'](_0x19d817[_0x5701('0xd')]) : void 0x0;
            }
        } catch (_0x5918de) {
            _0x363348 = _0x5918de;
            return Network['error'](_0x363348, _0x5701('0x29'));
        }
    }
    static ['OnAnotherPlayerMove'](_0x390112) {
        var _0x193a13;
        _0x193a13 = NetPartyManager['getCharById'](_0x390112[_0x5701('0x7')]);
        if (_0x193a13 == null) {
            if (_0x5701('0x2a') === _0x5701('0x2b')) {
                battler[_0x5701('0x2c')] = data['hp'];
                battler['_mp'] = data['mp'];
                battler[_0x5701('0x2d')] = data['tp'];
                battler[_0x5701('0x2e')] = data[_0x5701('0x2f')];
            } else {
                return;
            }
        }
        return ClientManager[_0x5701('0x30')](_0x193a13, _0x390112['data']);
    }
    static [_0x5701('0x30')](_0x357085, _0x52b7f2) {
        var _0x155aed;
        try {
            _0x357085[_0x5701('0x31')](_0x52b7f2[_0x5701('0x32')]);
            return _0x357085['onNetworkMoveData'](_0x52b7f2['moveData']);
        } catch (_0x302f3b) {
            _0x155aed = _0x302f3b;
            return Network[_0x5701('0x1c')](_0x155aed, _0x5701('0x33'));
        }
    }
    static ['OnEventMoveData'](_0x4b61ef) {
        var _0x58ff8a, _0xdc7df, _0x5b339b, _0x26d67f;
        try {
            _0x58ff8a = _0x4b61ef[_0x5701('0xd')];
            _0x26d67f = _0x58ff8a['mapId'];
            if ($gameMap[_0x5701('0x15')]() !== _0x26d67f) {
                if (_0x5701('0x34') !== 'SCkJt') {
                    return;
                } else {
                    worldData = _0x4b61ef[_0x5701('0xd')];
                    NetPartyManager['onActroItemsFromNetwork'](_0x4b61ef[_0x5701('0x7')], worldData[_0x5701('0x35')]);
                    NetPartyManager['onActorDataFromNetwork'](_0x4b61ef[_0x5701('0x7')], worldData[_0x5701('0x36')]);
                    return NetWorldManager[_0x5701('0x37')](worldData);
                }
            }
            _0x5b339b = $gameMap[_0x5701('0x38')](_0x58ff8a[_0x5701('0x1a')]);
            if (!_0x5b339b) {
                if (_0x5701('0x39') !== _0x5701('0x3a')) {
                    return;
                } else {
                    dataA = JsonEx[_0x5701('0x20')](_0x58ff8a[_0x5701('0x3b')]);
                    dataB = JsonEx[_0x5701('0x20')](_0x58ff8a[_0x5701('0x3c')]);
                    BattleManager[_0x5701('0x3d')](dataA, dataB);
                }
            }
            if (_0x58ff8a[_0x5701('0x3e')] != null) {
                if (_0x5701('0x3f') === _0x5701('0x40')) {
                    return;
                } else {
                    ClientManager[_0x5701('0x30')](_0x5b339b, _0x58ff8a[_0x5701('0x3e')]);
                }
            }
            if (_0x58ff8a[_0x5701('0x41')] != null) {
                if ('kUPBY' === _0x5701('0x42')) {
                    return _0x5b339b['onNetworkDirectionData'](_0x58ff8a[_0x5701('0x41')]);
                } else {
                    _0xdc7df = error;
                    return Network['error'](_0xdc7df, _0x5701('0x43'));
                }
            }
        } catch (_0x15726b) {
            _0xdc7df = _0x15726b;
            return Network['error'](_0xdc7df, _0x5701('0x44'));
        }
    }
    static [_0x5701('0x45')](_0x31b6f2) {
        var _0x378507, _0x16c6d8;
        try {
            _0x378507 = _0x31b6f2[_0x5701('0xd')];
            $gameTemp[_0x5701('0x46')] = _0x378507[_0x5701('0x47')];
            if ($gameTemp['networkWAction'] == null) {
                if (_0x5701('0x48') === _0x5701('0x49')) {
                    return Network[_0x5701('0x4a')](_0x31b6f2[_0x5701('0xd')]);
                } else {
                    return $gameTemp[_0x5701('0x4b')] = _0x378507[_0x5701('0x4c')];
                }
            }
        } catch (_0x461bd1) {
            _0x16c6d8 = _0x461bd1;
            return Network[_0x5701('0x1c')](_0x16c6d8, 'read\x20Window\x20Select\x20Data\x20from\x20Server');
        }
    }
    static ['OnEventSync'](_0x429484) {
        var _0x208b2a, _0x1ac7ba, _0x718f66, _0x522221;
        try {
            _0x5701('0x4d')['p']();
            _0x208b2a = _0x429484[_0x5701('0xd')];
            _0x522221 = _0x208b2a[_0x5701('0x15')];
            if ($gameMap['mapId']() !== _0x522221) {
                if (_0x5701('0x4e') === _0x5701('0x4f')) {
                    return;
                } else {
                    return;
                }
            }
            _0x718f66 = $gameMap[_0x5701('0x38')](_0x208b2a['eventId']);
            return _0x718f66 != null ? _0x718f66[_0x5701('0x50')](_0x208b2a['pi'], _0x208b2a['li']) : void 0x0;
        } catch (_0x580b04) {
            _0x1ac7ba = _0x580b04;
            return Network[_0x5701('0x1c')](_0x1ac7ba, _0x5701('0x51'));
        }
    }
    static [_0x5701('0x52')](_0x1f2522) {
        var _0x57c57b, _0x4b9bbc;
        try {
            'EVENT\x20LOCK\x20COMMAND'['p']();
            _0x57c57b = _0x1f2522[_0x5701('0xd')];
            if ($gameMap[_0x5701('0x15')]() !== _0x57c57b[_0x5701('0x15')]) {
                if ('OqvLz' !== _0x5701('0x53')) {
                    return;
                } else {
                    'EVENT\x20LOCK\x20COMMAND'['p']();
                    _0x57c57b = _0x1f2522[_0x5701('0xd')];
                    if ($gameMap[_0x5701('0x15')]() !== _0x57c57b[_0x5701('0x15')]) {
                        return;
                    }
                    return $gameMap['setLockedEventByNetwork'](_0x57c57b['eventId'], _0x57c57b['isLock']);
                }
            }
            return $gameMap['setLockedEventByNetwork'](_0x57c57b[_0x5701('0x1a')], _0x57c57b[_0x5701('0x1b')]);
        } catch (_0x141848) {
            if (_0x5701('0x54') === 'fBTJr') {
                sbj[_0x5701('0x55')]();
            } else {
                _0x4b9bbc = _0x141848;
                return Network[_0x5701('0x1c')](_0x4b9bbc, 'read\x20event\x20sync\x20data');
            }
        }
    }
    static [_0x5701('0x56')](_0x3cf9d4) {
        var _0x253ae3, _0x5a3928;
        try {
            'EVENT\x20OWN\x20COMMAND'['p']();
            _0x253ae3 = _0x3cf9d4[_0x5701('0xd')];
            if ($gameMap[_0x5701('0x15')]() !== _0x253ae3['mapId']) {
                if ('AITtN' === 'AITtN') {
                    return;
                } else {
                    var _0xa46ff6, _0x375c2a;
                    _0x5701('0x26')['p'](_0x3cf9d4['from']);
                    try {
                        _0xa46ff6 = NetPartyManager[_0x5701('0x28')](_0x3cf9d4[_0x5701('0x7')]);
                        return _0xa46ff6 != null ? _0xa46ff6['synchronizeFromNetwork'](_0x3cf9d4[_0x5701('0xd')]) : void 0x0;
                    } catch (_0x4f5a38) {
                        _0x375c2a = _0x4f5a38;
                        return Network['error'](_0x375c2a, 'While\x20character\x20synchronization');
                    }
                }
            }
            return $gameMap['setOwnedEventByNetwork'](_0x253ae3[_0x5701('0x1a')], _0x253ae3[_0x5701('0x1b')]);
        } catch (_0x43c894) {
            if ('KLJRv' === _0x5701('0x57')) {
                playerData = NetPartyManager[_0x5701('0x58')](_0x3cf9d4[_0x5701('0x7')]);
                return playerData[_0x5701('0x15')] = _0x3cf9d4[_0x5701('0xd')];
            } else {
                _0x5a3928 = _0x43c894;
                return Network[_0x5701('0x1c')](_0x5a3928, _0x5701('0x51'));
            }
        }
    }
    static [_0x5701('0x59')](_0x3614b7) {
        var _0x458ab6;
        try {
            'START\x20SHARED\x20EVENT\x20FROM\x20NETWORK'['p']();
            return $gameMap[_0x5701('0x5a')](_0x3614b7[_0x5701('0xd')]);
        } catch (_0x38b642) {
            if (_0x5701('0x5b') === _0x5701('0x5b')) {
                _0x458ab6 = _0x38b642;
                return Network['error'](_0x458ab6, _0x5701('0x5c'));
            } else {
                NetMessage[_0x5701('0x24')]()['send']($gamePlayer['collectDataForNetwork']());
                return NetPartyManager[_0x5701('0x1d')]();
            }
        }
    }
    static [_0x5701('0x5d')](_0xe6b837) {
        _0x5701('0x5e')['p']();
        return BattleManager['_selectInputCommandFromNetwork'](_0xe6b837['data']);
    }
    static ['OnBattleBattlerRefreshCommand'](_0x4c896b) {
        var _0x237e62, _0x239f19;
        _0x239f19 = _0x4c896b[_0x5701('0xd')];
        _0x5701('0x5f')['p'](_0x239f19['id']);
        _0x237e62 = BattleManager[_0x5701('0x60')](_0x239f19['id']);
        if (_0x237e62 != null) {
            _0x237e62[_0x5701('0x2c')] = _0x239f19['hp'];
            _0x237e62['_mp'] = _0x239f19['mp'];
            _0x237e62[_0x5701('0x2d')] = _0x239f19['tp'];
            _0x237e62[_0x5701('0x2e')] = _0x239f19['states'];
        }
    }
    static ['OnBattleActionCommand'](_0x1b8628) {
        var _0x168d6c, _0x204330, _0x5e75aa, _0x30154f, _0x10607e, _0x3135ef;
        _0x5e75aa = _0x1b8628[_0x5701('0xd')];
        _0x5701('0x61')['p'](_0x5e75aa['id']);
        if (_0x5e75aa['id'] === _0x5701('0x62')) {
            _0x10607e = BattleManager[_0x5701('0x60')](_0x5e75aa[_0x5701('0x63')]);
            _0x3135ef = BattleManager[_0x5701('0x60')](_0x5e75aa[_0x5701('0x64')]);
            if (_0x10607e != null) {
                _0x10607e[_0x5701('0x55')]();
            }
            _0x30154f = new Game_ActionResult();
            _0x30154f[_0x5701('0x65')](_0x5e75aa[_0x5701('0x66')]);
            _0x3135ef[_0x5701('0x67')] = _0x30154f;
            return;
        }
        _0x204330 = $gameParty[_0x5701('0x68')](_0x5e75aa['actorId']);
        _0x168d6c = _0x204330[_0x5701('0x69')]();
        if (_0x5e75aa['id'] === _0x5701('0x6a')) {
            if (_0x168d6c != null) {
                if (_0x5701('0x6b') !== _0x5701('0x6c')) {
                    _0x168d6c[_0x5701('0x6d')](_0x5e75aa[_0x5701('0x6e')]);
                } else {
                    _0x5701('0x6f')['p']();
                    return $gameMap[_0x5701('0x5a')](_0x1b8628['data']);
                }
            }
            return;
        }
        if (_0x5e75aa['id'] === _0x5701('0x70')) {
            if (_0x168d6c != null) {
                if (_0x5701('0x71') === _0x5701('0x72')) {
                    char[_0x5701('0x31')](netMovingData[_0x5701('0x32')]);
                    return char['onNetworkMoveData'](netMovingData[_0x5701('0x3e')]);
                } else {
                    _0x168d6c[_0x5701('0x73')](_0x5e75aa[_0x5701('0x6e')]);
                }
            }
            return;
        }
        if (_0x5e75aa['id'] === 'setTarget') {
            if (_0x168d6c != null) {
                _0x168d6c[_0x5701('0x74')](_0x5e75aa[_0x5701('0x6e')]);
            }
        }
    }
    static [_0x5701('0x75')](_0x45a7c8) {
        var _0x4cf84f, _0xf5ad26;
        _0xf5ad26 = _0x45a7c8[_0x5701('0xd')];
        _0x4cf84f = _0xf5ad26['id'];
        _0x5701('0x76')['p'](_0x4cf84f);
        if (_0x4cf84f === _0x5701('0x77')) {
            BattleManager[_0x5701('0x78')] = BattleManager[_0x5701('0x79')](_0xf5ad26[_0x5701('0x7a')]);
            return;
        }
        if (_0x4cf84f === _0x5701('0x7b')) {
            $gameTroop['setUniqueIdsForEnemies'](_0xf5ad26[_0x5701('0x7c')]);
            return;
        }
        if (_0x4cf84f === _0x5701('0x7d')) {
            if (_0x5701('0x7e') === _0x5701('0x7e')) {
                BattleManager[_0x5701('0x7d')]();
                return;
            } else {
                BattleManager[_0x5701('0x7f')]();
                return;
            }
        }
        if (_0x4cf84f === _0x5701('0x80')) {
            BattleManager['endTurn']();
            return;
        }
        if (_0x4cf84f === _0x5701('0x81')) {
            BattleManager[_0x5701('0x82')](_0xf5ad26[_0x5701('0x83')]);
            return;
        }
        if (_0x4cf84f === 'startAction') {
            if (_0x5701('0x84') === _0x5701('0x84')) {
                BattleManager[_0x5701('0x85')](_0xf5ad26[_0x5701('0x86')]);
                return;
            } else {
                return char != null ? char['showNetworkIcon'](_0x45a7c8['data']) : void 0x0;
            }
        }
        if (_0x4cf84f === 'invokeNormal') {
            if (_0x5701('0x87') === _0x5701('0x87')) {
                BattleManager[_0x5701('0x88')](_0xf5ad26[_0x5701('0x83')], _0xf5ad26['targetId']);
                return;
            } else {
                e = error;
                return Network[_0x5701('0x1c')](e, _0x5701('0x89'));
            }
        }
        if (_0x4cf84f === 'abortBattle') {
            BattleManager[_0x5701('0x7f')]();
            return;
        }
        if (_0x4cf84f === _0x5701('0x8a')) {
            BattleManager[_0x5701('0x8b')]();
            return;
        }
        if (_0x4cf84f === _0x5701('0x8c')) {
            BattleManager[_0x5701('0x8d')]();
            return;
        }
        if (_0x4cf84f === _0x5701('0x8e')) {
            BattleManager['_onEscapeFromNetwork'](_0xf5ad26[_0x5701('0x8f')]);
        }
    }
    static [_0x5701('0x90')](_0x42bbd9) {
        var _0x4bc193, _0x1cc177;
        'NETWORK\x20ICON'['p']();
        try {
            if ('roeJT' !== 'roeJT') {
                _0x1cc177 = error;
                return Network['error'](_0x1cc177, _0x5701('0x91'));
            } else {
                _0x4bc193 = NetPartyManager[_0x5701('0x28')](_0x42bbd9['from']);
                if (!Network[_0x5701('0x92')]()) {
                    if (_0x5701('0x93') === _0x5701('0x94')) {
                        mapId = _0x42bbd9[_0x5701('0xd')][_0x5701('0x15')];
                        if ($gameMap[_0x5701('0x15')]() !== mapId) {
                            'SERVER\x20MAP\x20IS\x20OTHER,\x20TRANSFER\x20PLAYER!'['p']();
                            transferData = _0x42bbd9[_0x5701('0xd')];
                            return $gamePlayer[_0x5701('0x95')](mapId, transferData['x'], transferData['y'], transferData['d'], 0x0);
                        }
                    } else {
                        return _0x4bc193 != null ? _0x4bc193[_0x5701('0x96')](_0x42bbd9[_0x5701('0xd')]) : void 0x0;
                    }
                }
            }
        } catch (_0x5ae280) {
            _0x1cc177 = _0x5ae280;
            return Network[_0x5701('0x1c')](_0x1cc177, 'While\x20start\x20network\x20icon');
        }
    }
    static [_0x5701('0x97')](_0x3932fa) {
        var _0x7dd484, _0x12a8ae, _0x45ea1e, _0x1d9ca8, _0x499a08;
        _0x5701('0x98')['p'](_0x3932fa[_0x5701('0xd')]['id']);
        _0x7dd484 = _0x3932fa[_0x5701('0xd')];
        try {
            _0x45ea1e = new Game_Interpreter();
            _0x45ea1e[_0x5701('0x99')] = _0x7dd484[_0x5701('0x9a')];
            _0x45ea1e[_0x5701('0x9b')] = _0x7dd484[_0x5701('0x15')];
            _0x45ea1e[_0x5701('0x9c')] = _0x7dd484[_0x5701('0x1a')];
            _0x499a08 = _0x5701('0x9d') + _0x7dd484['id'];
            _0x1d9ca8 = _0x45ea1e[_0x499a08];
            if (_0x1d9ca8 != null && typeof _0x1d9ca8 === _0x5701('0x9e')) {
                if ('JPHlF' === _0x5701('0x9f')) {
                    _0x45ea1e[_0x499a08]();
                    if (SceneManager['isCurrentSceneIsMenuBased']()) {
                        if ('LMVxL' !== _0x5701('0xa0')) {
                            SceneManager['safeRefreshCurrentScene']();
                        } else {
                            var _0x153298, _0x4cfe7e;
                            try {
                                _0x4cfe7e = _0x3932fa[_0x5701('0xd')];
                                NetPartyManager[_0x5701('0xa1')](_0x3932fa[_0x5701('0x7')], _0x4cfe7e[_0x5701('0x35')]);
                                NetPartyManager['onActorDataFromNetwork'](_0x3932fa['from'], _0x4cfe7e[_0x5701('0x36')]);
                                return NetWorldManager['onWorldDataFromNetwork'](_0x4cfe7e);
                            } catch (_0x2f3451) {
                                _0x153298 = _0x2f3451;
                                return Network[_0x5701('0x1c')](_0x153298, _0x5701('0xa2'));
                            }
                        }
                    }
                } else {
                    return event['onNetworkDirectionData'](_0x7dd484[_0x5701('0x41')]);
                }
            }
            return _0x45ea1e[_0x5701('0xa3')]();
        } catch (_0x344f99) {
            if ('YfSQh' !== 'YfSQh') {
                var _0x44bbd1;
                try {
                    char['onNetworkCharacterData'](netMovingData[_0x5701('0x32')]);
                    return char['onNetworkMoveData'](netMovingData['moveData']);
                } catch (_0x656ff5) {
                    _0x44bbd1 = _0x656ff5;
                    return Network[_0x5701('0x1c')](_0x44bbd1, _0x5701('0x33'));
                }
            } else {
                _0x12a8ae = _0x344f99;
                return Network[_0x5701('0x1c')](_0x12a8ae, _0x5701('0xa4'));
            }
        }
    }
    static ['OnTempMessage'](_0x57afa7) {
        return _0x5701('0xa5')['p']();
    }
    static [_0x5701('0xa6')](_0x17e4fe) {
        var _0x341246, _0x598a3b;
        try {
            NetPartyManager[_0x5701('0xa7')](_0x17e4fe[_0x5701('0x7')], _0x17e4fe[_0x5701('0xd')]);
            try {
                if (Network[_0x5701('0xb')]()) {
                    _0x341246 = NetPartyManager['getActorIdBySocketId'](_0x17e4fe['from']);
                    return Network[_0x5701('0xa8')][_0x5701('0xa9')](_0x341246, _0x17e4fe[_0x5701('0xd')]);
                }
            } catch (_0x1434a1) {
                _0x598a3b = _0x1434a1;
                return Network[_0x5701('0x1c')](_0x598a3b, _0x5701('0xaa'));
            }
        } catch (_0x504e8a) {
            _0x598a3b = _0x504e8a;
            return Network[_0x5701('0x1c')](_0x598a3b, _0x5701('0x43'));
        }
    }
    static [_0x5701('0xab')](_0x49c7ce) {
        var _0x4a0d2e, _0x4df0c6, _0x54586e;
        try {
            _0x4df0c6 = _0x49c7ce[_0x5701('0xd')][_0x5701('0x15')];
            if ($gameMap[_0x5701('0x15')]() !== _0x4df0c6) {
                'SERVER\x20MAP\x20IS\x20OTHER,\x20TRANSFER\x20PLAYER!'['p']();
                _0x54586e = _0x49c7ce[_0x5701('0xd')];
                return $gamePlayer[_0x5701('0x95')](_0x4df0c6, _0x54586e['x'], _0x54586e['y'], _0x54586e['d'], 0x0);
            }
        } catch (_0x2efbc1) {
            _0x4a0d2e = _0x2efbc1;
            return Network[_0x5701('0x1c')](_0x4a0d2e, 'While\x20try\x20synchronize\x20game\x20map\x20with\x20Server');
        }
    }
    static [_0x5701('0xac')](_0x5d963f) {
        var _0x47ac0f, _0x2233d2;
        try {
            _0x2233d2 = _0x5d963f[_0x5701('0xd')];
            NetPartyManager[_0x5701('0xa1')](_0x5d963f[_0x5701('0x7')], _0x2233d2[_0x5701('0x35')]);
            NetPartyManager[_0x5701('0xa7')](_0x5d963f[_0x5701('0x7')], _0x2233d2[_0x5701('0x36')]);
            return NetWorldManager['onWorldDataFromNetwork'](_0x2233d2);
        } catch (_0x19ce9e) {
            _0x47ac0f = _0x19ce9e;
            return Network[_0x5701('0x1c')](_0x47ac0f, _0x5701('0xa2'));
        }
    }
    static [_0x5701('0xad')](_0x333647) {
        var _0x5c8817;
        try {
            return NetWorldManager[_0x5701('0xae')](_0x333647[_0x5701('0xd')]);
        } catch (_0x4a9a54) {
            _0x5c8817 = _0x4a9a54;
            return Network['error'](_0x5c8817, _0x5701('0xaf'));
        }
    }
    static [_0x5701('0xb0')](_0x43fb31) {
        var _0x14775f, _0x458072;
        try {
            if (_0x5701('0xb1') !== _0x5701('0xb2')) {
                _0x458072 = NetPartyManager[_0x5701('0x58')](_0x43fb31['from']);
                return _0x458072[_0x5701('0x15')] = _0x43fb31[_0x5701('0xd')];
            } else {
                BattleManager['_startActionFromNetwork'](data[_0x5701('0x86')]);
                return;
            }
        } catch (_0x2f7626) {
            _0x14775f = _0x2f7626;
            return Network[_0x5701('0x1c')](_0x14775f, _0x5701('0xaf'));
        }
    }
    static [_0x5701('0xb3')](_0x3a38fa) {
        var _0x379d89, _0x212232, _0x4596b5, _0x15241b;
        try {
            _0x4596b5 = _0x3a38fa['data'];
            if ($gameMap[_0x5701('0x15')]() === _0x4596b5) {
                if (_0x5701('0xb4') === _0x5701('0xb4')) {
                    _0x212232 = $gameMap[_0x5701('0xb5')]();
                    _0x15241b = {
                        'mapId': $gameMap[_0x5701('0x15')](),
                        'mapData': _0x212232
                    };
                    NetMessage[_0x5701('0xb6')]()[_0x5701('0x13')](_0x15241b);
                    return NetMessage['RequestPlayerData']()[_0x5701('0x13')]();
                } else {
                    _0x379d89 = error;
                    return Network[_0x5701('0x1c')](_0x379d89, _0x5701('0x44'));
                }
            }
        } catch (_0x1446b0) {
            _0x379d89 = _0x1446b0;
            return Network['error'](_0x379d89, 'While\x20try\x20response\x20to\x20server\x20map\x20data\x20events\x20request');
        }
    }
    static [_0x5701('0xb7')](_0x396353) {
        var _0x244068, _0x56f800, _0x2c51c5;
        try {
            if ('MiVgA' !== _0x5701('0xb8')) {
                _0x244068 = error;
                return Network[_0x5701('0x1c')](_0x244068, _0x5701('0x33'));
            } else {
                _0x2c51c5 = _0x396353[_0x5701('0xd')]['mapId'];
                if ($gameMap[_0x5701('0x15')]() === _0x2c51c5) {
                    _0x56f800 = _0x396353[_0x5701('0xd')][_0x5701('0xb9')];
                    return $gameMap[_0x5701('0xba')](_0x56f800);
                }
            }
        } catch (_0x2b277e) {
            if (_0x5701('0xbb') === 'qUTVo') {
                return NetWorldManager['onGlobalWorldDataFromNetwork'](_0x396353['data']);
            } else {
                _0x244068 = _0x2b277e;
                return Network[_0x5701('0x1c')](_0x244068, 'While\x20responde\x20game\x20map\x20data\x20from\x20server');
            }
        }
    }
    static [_0x5701('0xbc')](_0x2c20b1) {
        _0x5701('0xbd')['p']();
        return Network[_0x5701('0xbe')] = !![];
    }
    static ['OnUserApiCommand'](_0x2b6c5c) {
        var _0xc220c7, _0x18a5c0, _0x830f;
        try {
            if ('WjalK' !== _0x5701('0xbf')) {
                _0xc220c7 = _0x2b6c5c[_0x5701('0xd')]['name'];
                _0x830f = _0x2b6c5c[_0x5701('0xd')]['parameters'];
                return uAPI[_0xc220c7](..._0x830f);
            } else {
                BattleManager[_0x5701('0x82')](data[_0x5701('0x83')]);
                return;
            }
        } catch (_0x2c5e13) {
            if (_0x5701('0xc0') !== _0x5701('0xc0')) {
                mapData = $gameMap[_0x5701('0xb5')]();
                response = {
                    'mapId': $gameMap[_0x5701('0x15')](),
                    'mapData': mapData
                };
                NetMessage[_0x5701('0xb6')]()['send'](response);
                return NetMessage[_0x5701('0x12')]()[_0x5701('0x13')]();
            } else {
                _0x18a5c0 = _0x2c5e13;
                return Network[_0x5701('0x1c')](_0x18a5c0, _0x5701('0xc1'));
            }
        }
    }
    static [_0x5701('0xc2')](_0x16bc39) {
        return Network[_0x5701('0x4a')](_0x16bc39[_0x5701('0xd')]);
    }
    static [_0x5701('0xc3')](_0x1d35bd) {
        var _0x430acb, _0x16e7e6, _0x5639bb, _0x131649, _0x5875e4, _0xe2dadb, _0x11b3ca, _0x1a39a1;
        try {
            if (_0x5701('0xc4') === _0x5701('0xc4')) {
                _0x5639bb = _0x1d35bd[_0x5701('0xd')];
                _0x16e7e6 = _0x5639bb['id'];
                _0x5701('0xc5')['p'](_0x16e7e6);
                if (_0x16e7e6 === _0x5701('0xc6')) {
                    _0x430acb = JsonEx[_0x5701('0x20')](_0x5639bb[_0x5701('0x4c')]);
                    BattleManager['_setPvPRivalActionFromNetwork'](_0x430acb);
                    return;
                }
                if (_0x16e7e6 === _0x5701('0xc7')) {
                    BattleManager['_startPvPTurnFromNetwork']();
                    return;
                }
                if (_0x16e7e6 === 'startActionPvP') {
                    _0x430acb = JsonEx[_0x5701('0x20')](_0x5639bb['action']);
                    BattleManager['_startActionFromNetworkPvP'](_0x5639bb[_0x5701('0x83')], _0x430acb, _0x5639bb[_0x5701('0x86')]);
                    return;
                }
                if (_0x16e7e6 === _0x5701('0xc8')) {
                    if (_0x5701('0xc9') === 'sTbVg') {
                        _0xe2dadb = error;
                        return Network[_0x5701('0x1c')](_0xe2dadb, _0x5701('0x5c'));
                    } else {
                        _0x11b3ca = JsonEx[_0x5701('0x20')](_0x5639bb[_0x5701('0xca')]);
                        _0x1a39a1 = JsonEx[_0x5701('0x20')](_0x5639bb[_0x5701('0xcb')]);
                        BattleManager['_invokeNormalActionFromNetworkPvP'](_0x5639bb[_0x5701('0x83')], _0x5639bb[_0x5701('0xcc')], _0x11b3ca, _0x1a39a1);
                        return;
                    }
                }
                if (_0x16e7e6 === _0x5701('0xcd')) {
                    _0x131649 = JsonEx[_0x5701('0x20')](_0x5639bb[_0x5701('0x3b')]);
                    _0x5875e4 = JsonEx[_0x5701('0x20')](_0x5639bb[_0x5701('0x3c')]);
                    BattleManager[_0x5701('0x3d')](_0x131649, _0x5875e4);
                }
            } else {
                return;
            }
        } catch (_0x482668) {
            _0xe2dadb = _0x482668;
            return Network[_0x5701('0x1c')](_0xe2dadb, _0x5701('0xce'));
        }
    }
    static ['OnDisconnect']() {
        return ClientManager[_0x5701('0x17')] = null;
    }
};
AlphaNET['register'](ClientManager);
})();

//Compressed by MV Plugin Builder
(function(){var _0x4f6f = [
    'isPoolReady',
    'WVbMQ',
    'REGISTER\x20\x20ON\x20EVENT',
    'abortWaitPool',
    'OnPlayerWorldData',
    'tYyip',
    'setPlayerWorldData',
    'OnSyncEvent',
    'onEventSyncCommand',
    'OnVirtualInterpreter',
    'PEuDv',
    'onEventVirtualCommand',
    'AnlKF',
    'ORTNL',
    'While\x20try\x20check\x20virtual\x20command\x20on\x20Server',
    'isHost',
    'kIcGy',
    'getPlayer',
    'getPlayerByIndex',
    '_GetClientById',
    'StartPvPBattle',
    'actorId',
    'setPlayerItemsData',
    'While\x20try\x20save\x20another\x20actor\x20data',
    'GVlSa',
    'forEach',
    'bYZQb',
    'SEND\x20REQUEST\x20TO\x20PLAYER',
    'DnXwr',
    'RequestGameMapEventsData',
    'xwXUz',
    '_SendMapDataResponseToClient',
    'wUQdk',
    'While\x20try\x20get\x20map\x20events\x20data\x20from\x20server',
    '_getClientById',
    'OnMapDataResonpse',
    'iBQxl',
    'while\x20get\x20map\x20data\x20response',
    'GameMapEventsDataResponse',
    'OnPlayerChangeMap',
    'lobbH',
    'YmCGL',
    'SetOwner',
    'LqbTI',
    'whoStart',
    'DeBew',
    'JOXFo',
    'getPlayerByActorId',
    'NOT\x20OWNER\x20ANYMORE',
    'VULFm',
    'ANOTHER\x20OWNER',
    'OnPlayerRequestPvPWithAnother',
    'pYGTa',
    'WqYEd',
    'QvTno',
    'inputActionPvP',
    'myRivalActorId',
    'BattleManagerPvP',
    'startTurnPvP',
    'startActionPvP',
    'invokeNormalActionPvP',
    'endActionPvP',
    'OnBattleManagerPvPCommand',
    'Init',
    'serv',
    'instance',
    'eventWaitPool',
    'mapUpdateWaitPool',
    'RegisterHost',
    'REGISTER\x20HOST',
    'registerNewPlayer',
    'myPlayerData',
    'players',
    'first',
    'mapId',
    'mapOwnerPool',
    'znNsh',
    'syncPools',
    'LIBS',
    'NetWaitPool',
    '_startSyncPoolThread',
    'sessionData',
    'NetSessionData',
    'OnNewPlayerConnected',
    'canConnectToServer',
    'WdvZr',
    'error',
    'AlertMessage',
    'send',
    'Server\x20is\x20Busy!\x20Try\x20again\x20later!',
    'disconnect',
    'isMaximumForNetwork',
    'xezHs',
    '_host',
    'stopServer',
    '_CheckExistsOwner',
    'PlayerDisconnect',
    'setFrom',
    'Server\x20is\x20Full!',
    'allowConnect',
    'Connection\x20restricted\x20by\x20Server!',
    'RegisterNewPlayer',
    'PlayersTableResponse',
    'broadcast',
    'getActorIdBySocketId',
    'hasInfoAbout',
    'getAllData',
    'PlayerWorldData',
    'isMultiMode',
    '_SendHostMapIdToClient',
    'getGlobalData',
    'getWorldDataNetwork',
    'when\x20new\x20player\x20register',
    'direction',
    'HostGameMapId',
    'OnClientDisconnect',
    '_netServer',
    'sJkuE',
    'SERVER\x20START\x20NET\x20MESSAGE',
    'IsEventPoolExists',
    'eventId',
    'RegisterOnSharedEvent',
    'data',
    'waitId',
    'addClient',
    'YSgrb',
    'PlayerConnect',
    '!!!\x20ABORT,\x20something\x20wrong!',
    'from',
    'RegisterOnSharedEventSync',
    'REGISTER\x20\x20ON\x20EVENT\x20SYNC\x20LINE',
    'line',
    'CreateEventPool',
    '_waitPoolThread',
    'QJStG',
    'clientsCount',
    'onWaitPoolReady',
    'eEnWZ',
    'RegisterOnSync',
    'SERVER\x20ACCEPT\x20SYNC\x20REQUEST',
    'RegisterOnSyncPool',
    'RNUeY',
    'HIMst',
    'getPoolSize'
];
(function (_0x5bd8be, _0x1fe605) {
    var _0x9bdc2a = function (_0x5df136) {
        while (--_0x5df136) {
            _0x5bd8be['push'](_0x5bd8be['shift']());
        }
    };
    _0x9bdc2a(++_0x1fe605);
}(_0x4f6f, 0x1ef));
var _0x3ba0 = function (_0x269cfa, _0xfead9f) {
    _0x269cfa = _0x269cfa - 0x0;
    var _0x5505fb = _0x4f6f[_0x269cfa];
    return _0x5505fb;
};
var ServerManager;
ServerManager = class ServerManager {
    static [_0x3ba0('0x0')](_0x21be7e) {
        this['_netServer'] = _0x21be7e;
        this[_0x3ba0('0x1')] = _0x21be7e[_0x3ba0('0x2')]();
        this[_0x3ba0('0x3')] = null;
        this['syncPools'] = {};
        this[_0x3ba0('0x4')] = {};
        return this['mapOwnerPool'] = {};
    }
    static [_0x3ba0('0x5')](_0x604101) {
        _0x3ba0('0x6')['p']();
        NetPartyManager[_0x3ba0('0x7')](_0x604101['id']);
        Network[_0x3ba0('0x8')] = Network[_0x3ba0('0x9')][_0x3ba0('0xa')]();
        Network[_0x3ba0('0x8')][_0x3ba0('0xb')] = $gameMap[_0x3ba0('0xb')]();
        ServerManager[_0x3ba0('0xc')][$gameMap['mapId']()] = _0x604101['id'];
        Network['_isMapOwner'] = !![];
        if (Network['sessionData'] === null) {
            if (_0x3ba0('0xd') === 'HUIys') {
                var _0x3ac90c;
                if (ServerManager[_0x3ba0('0xe')][poolId] == null) {
                    ServerManager[_0x3ba0('0xe')][poolId] = new AlphaNET[(_0x3ba0('0xf'))][(_0x3ba0('0x10'))](poolId);
                    ServerManager[_0x3ba0('0x11')](poolId);
                }
                _0x3ac90c = ServerManager['syncPools'][poolId];
                return _0x3ac90c['addClient'](_0x604101, !![]);
            } else {
                return Network[_0x3ba0('0x12')] = new AlphaNET[(_0x3ba0('0xf'))][(_0x3ba0('0x13'))]();
            }
        }
    }
    static [_0x3ba0('0x14')](_0x113d36) {
        if (!Network[_0x3ba0('0x15')]()) {
            if (_0x3ba0('0x16') !== _0x3ba0('0x16')) {
                e = error;
                return Network[_0x3ba0('0x17')](e, 'OnBattleManagerPvPCommand');
            } else {
                NetMessage[_0x3ba0('0x18')](_0x113d36)[_0x3ba0('0x19')](_0x3ba0('0x1a'));
                _0x113d36[_0x3ba0('0x1b')]();
                return;
            }
        }
        if ($gameParty[_0x3ba0('0x1c')]()) {
            if (_0x3ba0('0x1d') !== _0x3ba0('0x1d')) {
                if (_0x113d36['id'] === ServerManager['_netServer'][_0x3ba0('0x1e')]['id']) {
                    return Network[_0x3ba0('0x1f')]();
                } else {
                    ServerManager[_0x3ba0('0x20')](_0x113d36['id']);
                    return NetMessage[_0x3ba0('0x21')](_0x113d36)[_0x3ba0('0x22')](_0x113d36['id'])['broadcast']();
                }
            } else {
                NetMessage[_0x3ba0('0x18')](_0x113d36)['send'](_0x3ba0('0x23'));
                _0x113d36[_0x3ba0('0x1b')]();
                return;
            }
        }
        if (!Network[_0x3ba0('0x24')]()) {
            NetMessage[_0x3ba0('0x18')](_0x113d36)['send'](_0x3ba0('0x25'));
            _0x113d36[_0x3ba0('0x1b')]();
            return;
        }
        return this['RegisterNewPlayer'](_0x113d36);
    }
    static [_0x3ba0('0x26')](_0x1e15e3) {
        var _0x1391f7, _0x101bd3, _0x4c3ccd, _0x20099c;
        try {
            NetPartyManager[_0x3ba0('0x7')](_0x1e15e3['id']);
            NetMessage[_0x3ba0('0x27')](ServerManager[_0x3ba0('0x1')])[_0x3ba0('0x19')](Network[_0x3ba0('0x9')]);
            NetMessage['PlayerConnect'](_0x1e15e3)[_0x3ba0('0x28')]();
            _0x4c3ccd = NetPartyManager[_0x3ba0('0x29')](_0x1e15e3['id']);
            if (Network[_0x3ba0('0x12')][_0x3ba0('0x2a')](_0x4c3ccd)) {
                _0x20099c = Network[_0x3ba0('0x12')][_0x3ba0('0x2b')](_0x4c3ccd);
                NetMessage[_0x3ba0('0x2c')](_0x1e15e3)['send'](_0x20099c);
            }
            if (!Network[_0x3ba0('0x2d')]()) {
                ServerManager[_0x3ba0('0x2e')](_0x1e15e3);
            }
            _0x101bd3 = Network[_0x3ba0('0x12')][_0x3ba0('0x2f')]()[_0x3ba0('0x30')]();
            return NetMessage['GlobalWorldData'](_0x1e15e3)[_0x3ba0('0x19')](_0x101bd3);
        } catch (_0x46ff9e) {
            _0x1391f7 = _0x46ff9e;
            return Network['error'](_0x1391f7, _0x3ba0('0x31'));
        }
    }
    static [_0x3ba0('0x2e')](_0x523c8b) {
        var _0x14deab;
        _0x14deab = {
            'mapId': $gameMap['mapId'](),
            'x': $gamePlayer['x'],
            'y': $gamePlayer['y'],
            'd': $gamePlayer[_0x3ba0('0x32')]()
        };
        return NetMessage[_0x3ba0('0x33')](_0x523c8b)[_0x3ba0('0x19')](_0x14deab);
    }
    static [_0x3ba0('0x34')](_0x3e5273) {
        if (_0x3e5273['id'] === ServerManager[_0x3ba0('0x35')]['_host']['id']) {
            if ('wXKju' === _0x3ba0('0x36')) {
                NetMessage[_0x3ba0('0x18')](_0x3e5273)[_0x3ba0('0x19')]('Connection\x20restricted\x20by\x20Server!');
                _0x3e5273[_0x3ba0('0x1b')]();
                return;
            } else {
                return Network[_0x3ba0('0x1f')]();
            }
        } else {
            ServerManager['_CheckExistsOwner'](_0x3e5273['id']);
            return NetMessage['PlayerDisconnect'](_0x3e5273)['setFrom'](_0x3e5273['id'])['broadcast']();
        }
    }
    static ['StartSharedEvent'](_0x1f1a14) {
        _0x3ba0('0x37')['p']();
        if (!ServerManager[_0x3ba0('0x38')]()) {
            ServerManager['CreateEventPool'](_0x1f1a14['data'][_0x3ba0('0x39')]);
        }
        return ServerManager[_0x3ba0('0x3a')](_0x1f1a14);
    }
    static [_0x3ba0('0x3a')](_0x379cfd) {
        'REGISTER\x20\x20ON\x20EVENT'['p']();
        if (ServerManager[_0x3ba0('0x3')] != null && _0x379cfd[_0x3ba0('0x3b')][_0x3ba0('0x39')] === ServerManager[_0x3ba0('0x3')][_0x3ba0('0x3c')]) {
            return ServerManager[_0x3ba0('0x3')][_0x3ba0('0x3d')](_0x379cfd['from'], !![]);
        } else {
            if (_0x3ba0('0x3e') !== _0x3ba0('0x3e')) {
                NetPartyManager[_0x3ba0('0x7')](client['id']);
                NetMessage[_0x3ba0('0x27')](ServerManager[_0x3ba0('0x1')])[_0x3ba0('0x19')](Network['players']);
                NetMessage[_0x3ba0('0x3f')](client)[_0x3ba0('0x28')]();
                newPlayerActorId = NetPartyManager[_0x3ba0('0x29')](client['id']);
                if (Network[_0x3ba0('0x12')]['hasInfoAbout'](newPlayerActorId)) {
                    worldData = Network['sessionData'][_0x3ba0('0x2b')](newPlayerActorId);
                    NetMessage['PlayerWorldData'](client)[_0x3ba0('0x19')](worldData);
                }
                if (!Network[_0x3ba0('0x2d')]()) {
                    ServerManager[_0x3ba0('0x2e')](client);
                }
                global = Network[_0x3ba0('0x12')]['getGlobalData']()[_0x3ba0('0x30')]();
                return NetMessage['GlobalWorldData'](client)['send'](global);
            } else {
                Network[_0x3ba0('0x17')]('', _0x3ba0('0x3a'));
                _0x3ba0('0x40')['p']();
                return ServerManager[_0x3ba0('0x35')]['abortWaitPool'](_0x379cfd[_0x3ba0('0x41')], -0x64);
            }
        }
    }
    static [_0x3ba0('0x42')](_0x24f162) {
        _0x3ba0('0x43')['p'](_0x24f162[_0x3ba0('0x3b')][_0x3ba0('0x44')]);
        if (!ServerManager[_0x3ba0('0x38')]()) {
            ServerManager[_0x3ba0('0x45')](_0x24f162[_0x3ba0('0x3b')][_0x3ba0('0x39')]);
        }
        if (_0x24f162[_0x3ba0('0x3b')][_0x3ba0('0x39')] !== ServerManager[_0x3ba0('0x3')][_0x3ba0('0x3c')]) {
            return;
        }
        return ServerManager[_0x3ba0('0x3')]['addClient'](_0x24f162[_0x3ba0('0x41')], !![]);
    }
    static [_0x3ba0('0x38')]() {
        return this[_0x3ba0('0x3')] != null;
    }
    static ['CreateEventPool'](_0x2fab70) {
        var _0x3d853e;
        ServerManager[_0x3ba0('0x3')] = new AlphaNET[(_0x3ba0('0xf'))][(_0x3ba0('0x10'))](_0x2fab70);
        return ServerManager[_0x3ba0('0x46')] = setTimeout(_0x3d853e = function () {
            if (_0x3ba0('0x47') === 'orGmH') {
                NetMessage[_0x3ba0('0x18')](client)['send'](_0x3ba0('0x1a'));
                client[_0x3ba0('0x1b')]();
                return;
            } else {
                var _0x5aa182, _0x865dd5;
                if (((_0x865dd5 = ServerManager['eventWaitPool']) != null ? _0x865dd5['getPoolSize']() : void 0x0) === ServerManager[_0x3ba0('0x35')][_0x3ba0('0x48')]()) {
                    if (ServerManager[_0x3ba0('0x3')]['isPoolReady']()) {
                        _0x5aa182 = ServerManager[_0x3ba0('0x3')][_0x3ba0('0x3c')];
                        ServerManager[_0x3ba0('0x35')][_0x3ba0('0x49')](_0x5aa182);
                        ServerManager[_0x3ba0('0x3')] = null;
                        return;
                    }
                }
                if (ServerManager[_0x3ba0('0x3')] != null) {
                    if (_0x3ba0('0x4a') !== 'zHFvx') {
                        ServerManager['_waitPoolThread'] = setTimeout(_0x3d853e, 0x64);
                    } else {
                        if (!Network['canConnectToServer']()) {
                            NetMessage[_0x3ba0('0x18')](client)['send'](_0x3ba0('0x1a'));
                            client[_0x3ba0('0x1b')]();
                            return;
                        }
                        if ($gameParty[_0x3ba0('0x1c')]()) {
                            NetMessage[_0x3ba0('0x18')](client)[_0x3ba0('0x19')]('Server\x20is\x20Full!');
                            client['disconnect']();
                            return;
                        }
                        if (!Network[_0x3ba0('0x24')]()) {
                            NetMessage[_0x3ba0('0x18')](client)[_0x3ba0('0x19')]('Connection\x20restricted\x20by\x20Server!');
                            client[_0x3ba0('0x1b')]();
                            return;
                        }
                        return this['RegisterNewPlayer'](client);
                    }
                }
            }
        }, 0x64);
    }
    static [_0x3ba0('0x4b')](_0x3d533f) {
        var _0x3d3837;
        _0x3ba0('0x4c')['p'](_0x3d533f[_0x3ba0('0x3b')]);
        _0x3d3837 = _0x3d533f['data'];
        return ServerManager[_0x3ba0('0x4d')](_0x3d3837, _0x3d533f[_0x3ba0('0x41')]);
    }
    static [_0x3ba0('0x4d')](_0x1af4cd, _0x407585) {
        var _0x44fa45;
        if (ServerManager[_0x3ba0('0xe')][_0x1af4cd] == null) {
            if (_0x3ba0('0x4e') === _0x3ba0('0x4f')) {
                ServerManager['syncPools'][_0x1af4cd] = new AlphaNET[(_0x3ba0('0xf'))][(_0x3ba0('0x10'))](_0x1af4cd);
                ServerManager[_0x3ba0('0x11')](_0x1af4cd);
            } else {
                ServerManager['syncPools'][_0x1af4cd] = new AlphaNET['LIBS']['NetWaitPool'](_0x1af4cd);
                ServerManager[_0x3ba0('0x11')](_0x1af4cd);
            }
        }
        _0x44fa45 = ServerManager[_0x3ba0('0xe')][_0x1af4cd];
        return _0x44fa45[_0x3ba0('0x3d')](_0x407585, !![]);
    }
    static [_0x3ba0('0x11')](_0x10cbd3) {
        var _0x186323;
        return setTimeout(_0x186323 = function () {
            var _0x4ab007, _0x235905;
            _0x4ab007 = ServerManager[_0x3ba0('0xe')][_0x10cbd3];
            if (_0x4ab007 == null) {
                return;
            }
            _0x235905 = ServerManager[_0x3ba0('0x35')]['clientsCount']();
            if (_0x4ab007[_0x3ba0('0x50')]() === _0x235905 && _0x4ab007[_0x3ba0('0x51')]()) {
                ServerManager[_0x3ba0('0x35')]['onWaitPoolReady'](_0x4ab007[_0x3ba0('0x3c')]);
                ServerManager[_0x3ba0('0xe')][_0x10cbd3] = null;
                return;
            } else {
                if (_0x3ba0('0x52') === 'WVbMQ') {
                    setTimeout(_0x186323, 0x64);
                } else {
                    _0x3ba0('0x53')['p']();
                    if (ServerManager[_0x3ba0('0x3')] != null && networkData[_0x3ba0('0x3b')][_0x3ba0('0x39')] === ServerManager['eventWaitPool'][_0x3ba0('0x3c')]) {
                        return ServerManager['eventWaitPool'][_0x3ba0('0x3d')](networkData[_0x3ba0('0x41')], !![]);
                    } else {
                        Network[_0x3ba0('0x17')]('', 'RegisterOnSharedEvent');
                        _0x3ba0('0x40')['p']();
                        return ServerManager[_0x3ba0('0x35')][_0x3ba0('0x54')](networkData[_0x3ba0('0x41')], -0x64);
                    }
                }
            }
        }, 0x64);
    }
    static [_0x3ba0('0x55')](_0x1e7ad0) {
        var _0x23340f;
        _0x23340f = NetPartyManager[_0x3ba0('0x29')](_0x1e7ad0[_0x3ba0('0x41')]);
        if (_0x23340f == null) {
            if (_0x3ba0('0x56') !== 'VxJdh') {
                return;
            } else {
                ServerManager[_0x3ba0('0x35')][_0x3ba0('0x49')](pool[_0x3ba0('0x3c')]);
                ServerManager[_0x3ba0('0xe')][poolId] = null;
                return;
            }
        }
        Network[_0x3ba0('0x12')][_0x3ba0('0x57')](_0x23340f, _0x1e7ad0['data']);
    }
    static [_0x3ba0('0x58')](_0x3efb2b) {
        return NetWorldManager[_0x3ba0('0x59')](_0x3efb2b['data']);
    }
    static [_0x3ba0('0x5a')](_0x383e54) {
        var _0x1b8838, _0x5c55d9;
        _0x1b8838 = _0x383e54[_0x3ba0('0x3b')];
        try {
            if ('PEuDv' === _0x3ba0('0x5b')) {
                return NetWorldManager[_0x3ba0('0x5c')](_0x1b8838);
            } else {
                this[_0x3ba0('0x35')] = netServer;
                this[_0x3ba0('0x1')] = netServer[_0x3ba0('0x2')]();
                this[_0x3ba0('0x3')] = null;
                this[_0x3ba0('0xe')] = {};
                this[_0x3ba0('0x4')] = {};
                return this['mapOwnerPool'] = {};
            }
        } catch (_0x87b0f6) {
            if (_0x3ba0('0x5d') === _0x3ba0('0x5e')) {
                Network['error']('', _0x3ba0('0x3a'));
                _0x3ba0('0x40')['p']();
                return ServerManager[_0x3ba0('0x35')][_0x3ba0('0x54')](_0x383e54[_0x3ba0('0x41')], -0x64);
            } else {
                _0x5c55d9 = _0x87b0f6;
                return Network[_0x3ba0('0x17')](_0x5c55d9, _0x3ba0('0x5f'));
            }
        }
    }
    static ['OnPlayerNetItemsData'](_0x4d3227) {
        var _0x4cd16b, _0x507845;
        try {
            if (Network[_0x3ba0('0x60')]()) {
                if ('kpyIB' === _0x3ba0('0x61')) {
                    playerOne = NetPartyManager[_0x3ba0('0x62')](_0x4d3227['from']);
                    playerTwo = NetPartyManager[_0x3ba0('0x63')](_0x4d3227[_0x3ba0('0x3b')]);
                    client = ServerManager[_0x3ba0('0x64')](_0x4d3227[_0x3ba0('0x41')]);
                    client2 = ServerManager[_0x3ba0('0x64')](playerTwo['id']);
                    if (client && client2) {
                        NetMessage[_0x3ba0('0x65')](client)[_0x3ba0('0x19')](playerTwo[_0x3ba0('0x66')]);
                        return NetMessage[_0x3ba0('0x65')](client2)[_0x3ba0('0x19')](playerOne['actorId']);
                    } else {
                    }
                } else {
                    _0x4cd16b = NetPartyManager['getActorIdBySocketId'](_0x4d3227[_0x3ba0('0x41')]);
                    return Network[_0x3ba0('0x12')][_0x3ba0('0x67')](_0x4cd16b, _0x4d3227['data']);
                }
            }
        } catch (_0x4f5154) {
            _0x507845 = _0x4f5154;
            return Network[_0x3ba0('0x17')](_0x507845, _0x3ba0('0x68'));
        }
    }
    static ['OnPlayerRequestMapData'](_0x5abbd5) {
        var _0x1d7fcd, _0x1b6b05, _0x58e6d1, _0x32fc91;
        try {
            if (_0x3ba0('0x69') === _0x3ba0('0x69')) {
                ServerManager[_0x3ba0('0x4')][_0x5abbd5[_0x3ba0('0x41')]] = _0x5abbd5['data'];
                _0x32fc91 = null;
                Network['players'][_0x3ba0('0x6a')](function (_0x4226f0) {
                    if (_0x4226f0['mapId'] === _0x5abbd5[_0x3ba0('0x3b')] && _0x4226f0['id'] !== _0x5abbd5[_0x3ba0('0x41')]) {
                        return _0x32fc91 = _0x4226f0['id'];
                    }
                });
                if (_0x32fc91 != null) {
                    if (_0x3ba0('0x6b') === _0x3ba0('0x6b')) {
                        _0x3ba0('0x6c')['p']();
                        _0x1d7fcd = ServerManager[_0x3ba0('0x64')](_0x32fc91);
                        if (_0x1d7fcd != null) {
                            if ('gWTNr' === _0x3ba0('0x6d')) {
                                return NetWorldManager[_0x3ba0('0x5c')](data);
                            } else {
                                return NetMessage[_0x3ba0('0x6e')](_0x1d7fcd)[_0x3ba0('0x19')](_0x5abbd5[_0x3ba0('0x3b')]);
                            }
                        }
                    } else {
                        if (Network[_0x3ba0('0x60')]()) {
                            actorId = NetPartyManager[_0x3ba0('0x29')](_0x5abbd5[_0x3ba0('0x41')]);
                            return Network[_0x3ba0('0x12')][_0x3ba0('0x67')](actorId, _0x5abbd5['data']);
                        }
                    }
                } else {
                    if (_0x3ba0('0x6f') === _0x3ba0('0x6f')) {
                        _0x58e6d1 = {
                            'mapId': _0x5abbd5[_0x3ba0('0x3b')],
                            'mapData': []
                        };
                        return ServerManager[_0x3ba0('0x70')](_0x5abbd5[_0x3ba0('0x41')], _0x58e6d1);
                    } else {
                        return ServerManager[_0x3ba0('0x3')][_0x3ba0('0x3d')](_0x5abbd5[_0x3ba0('0x41')], !![]);
                    }
                }
            } else {
                ServerManager[_0x3ba0('0x46')] = setTimeout(mama, 0x64);
            }
        } catch (_0x29afe5) {
            if (_0x3ba0('0x71') === _0x3ba0('0x71')) {
                _0x1b6b05 = _0x29afe5;
                return Network[_0x3ba0('0x17')](_0x1b6b05, _0x3ba0('0x72'));
            } else {
                return this[_0x3ba0('0x3')] != null;
            }
        }
    }
    static [_0x3ba0('0x64')](_0x10f33b) {
        return ServerManager[_0x3ba0('0x35')][_0x3ba0('0x73')](_0x10f33b);
    }
    static [_0x3ba0('0x74')](_0x3e2d1d) {
        var _0x1aa2c7, _0x412cf6, _0xaaf7a7, _0x2cc847;
        try {
            _0xaaf7a7 = _0x3e2d1d['data'][_0x3ba0('0xb')];
            _0x2cc847 = null;
            for (_0x412cf6 in ServerManager[_0x3ba0('0x4')]) {
                if ('iBQxl' !== _0x3ba0('0x75')) {
                    var _0x4cd0e7;
                    _0x3ba0('0x4c')['p'](_0x3e2d1d[_0x3ba0('0x3b')]);
                    _0x4cd0e7 = _0x3e2d1d[_0x3ba0('0x3b')];
                    return ServerManager['RegisterOnSyncPool'](_0x4cd0e7, _0x3e2d1d['from']);
                } else {
                    if (ServerManager['mapUpdateWaitPool'][_0x412cf6] === _0xaaf7a7) {
                        _0x2cc847 = _0x412cf6;
                        break;
                    }
                }
            }
            if (_0x2cc847 != null) {
                return ServerManager[_0x3ba0('0x70')](_0x2cc847, _0x3e2d1d['data']);
            }
        } catch (_0x721fa6) {
            _0x1aa2c7 = _0x721fa6;
            return Network[_0x3ba0('0x17')](_0x1aa2c7, _0x3ba0('0x76'));
        }
    }
    static [_0x3ba0('0x70')](_0x176c77, _0xba0967) {
        var _0x36e4ff;
        _0x36e4ff = ServerManager[_0x3ba0('0x64')](_0x176c77);
        if (_0x36e4ff != null) {
            ServerManager[_0x3ba0('0x4')][_0x176c77] = null;
            NetMessage[_0x3ba0('0x77')](_0x36e4ff)[_0x3ba0('0x19')](_0xba0967);
        }
    }
    static [_0x3ba0('0x78')](_0x535c30) {
        var _0x4a6068, _0x1eaf6e, _0x322ba7;
        try {
            if (!Network[_0x3ba0('0x2d')]()) {
                return;
            }
            ServerManager['_CheckExistsOwner'](_0x535c30[_0x3ba0('0x41')]);
            _0x322ba7 = _0x535c30[_0x3ba0('0x3b')];
            if (ServerManager[_0x3ba0('0xc')][_0x322ba7] == null) {
                if (_0x3ba0('0x79') === _0x3ba0('0x79')) {
                    ServerManager['mapOwnerPool'][_0x322ba7] = _0x535c30[_0x3ba0('0x41')];
                    _0x4a6068 = ServerManager[_0x3ba0('0x64')](_0x535c30[_0x3ba0('0x41')]);
                    if (_0x4a6068 != null) {
                        if (_0x3ba0('0x7a') === _0x3ba0('0x7a')) {
                            NetMessage[_0x3ba0('0x7b')](_0x4a6068)['send']();
                        } else {
                            ServerManager[_0x3ba0('0x2e')](_0x4a6068);
                        }
                    }
                } else {
                    return NetMessage[_0x3ba0('0x6e')](_0x4a6068)['send'](_0x535c30['data']);
                }
            }
        } catch (_0x4dccfd) {
            _0x1eaf6e = _0x4dccfd;
            return Network[_0x3ba0('0x17')](_0x1eaf6e, _0x3ba0('0x78'));
        }
    }
    static [_0x3ba0('0x20')](_0x1d7f91) {
        var _0xdfe354, _0x296888, _0x4e6b95, _0xcd6623;
        if (!Network[_0x3ba0('0x2d')]()) {
            return;
        }
        _0xcd6623 = null;
        _0x4e6b95 = 0x0;
        for (_0x296888 in ServerManager[_0x3ba0('0xc')]) {
            if (ServerManager[_0x3ba0('0xc')][_0x296888] === _0x1d7f91) {
                if ('LqbTI' !== _0x3ba0('0x7c')) {
                    _0xdfe354 = _getClient(data[_0x3ba0('0x7d')]);
                    NetMessage['BattleManagerPvP'](_0xdfe354)[_0x3ba0('0x19')](data);
                    return;
                } else {
                    _0xcd6623 = Network[_0x3ba0('0x9')]['find'](function (_0x226a35) {
                        if (_0x226a35[_0x3ba0('0xb')] === Number(_0x296888)) {
                            if (_0x3ba0('0x7e') === _0x3ba0('0x7f')) {
                                return;
                            } else {
                                return _0x226a35;
                            }
                        }
                    });
                    if (_0xcd6623 != null) {
                        if ('VOunM' === 'VOunM') {
                            _0x4e6b95 = _0x296888;
                            break;
                        } else {
                            var _0x43a198, _0x4c42b8;
                            _0x4c42b8 = NetPartyManager[_0x3ba0('0x80')](_0x1d7f91);
                            _0x43a198 = ServerManager['_GetClientById'](_0x4c42b8['id']);
                            return _0x43a198;
                        }
                    } else {
                        ServerManager[_0x3ba0('0xc')][_0x296888] = null;
                        _0x3ba0('0x81')['p']();
                    }
                }
            }
        }
        if (_0xcd6623 != null) {
            ServerManager[_0x3ba0('0xc')][_0x4e6b95] = _0xcd6623['id'];
            _0xdfe354 = ServerManager['_GetClientById'](_0xcd6623['id']);
            if (_0xdfe354 != null) {
                if (_0x3ba0('0x82') !== _0x3ba0('0x82')) {
                    return item;
                } else {
                    NetMessage['SetOwner'](_0xdfe354)[_0x3ba0('0x19')]();
                }
            }
            return _0x3ba0('0x83')['p']();
        }
    }
    static [_0x3ba0('0x84')](_0x8ae387) {
        var _0x4824fb, _0x227a7b, _0x2156d7, _0xc700d3, _0x77f45b;
        try {
            _0xc700d3 = NetPartyManager[_0x3ba0('0x62')](_0x8ae387['from']);
            _0x77f45b = NetPartyManager[_0x3ba0('0x63')](_0x8ae387[_0x3ba0('0x3b')]);
            _0x4824fb = ServerManager['_GetClientById'](_0x8ae387[_0x3ba0('0x41')]);
            _0x227a7b = ServerManager[_0x3ba0('0x64')](_0x77f45b['id']);
            if (_0x4824fb && _0x227a7b) {
                NetMessage[_0x3ba0('0x65')](_0x4824fb)[_0x3ba0('0x19')](_0x77f45b['actorId']);
                return NetMessage[_0x3ba0('0x65')](_0x227a7b)[_0x3ba0('0x19')](_0xc700d3[_0x3ba0('0x66')]);
            } else {
            }
        } catch (_0x4f97ba) {
            if ('pYGTa' !== _0x3ba0('0x85')) {
                actorId = NetPartyManager[_0x3ba0('0x29')](_0x8ae387['from']);
                return Network['sessionData']['setPlayerItemsData'](actorId, _0x8ae387[_0x3ba0('0x3b')]);
            } else {
                _0x2156d7 = _0x4f97ba;
                return Network['error'](_0x2156d7, 'OnPlayerStartPvPWithAnother');
            }
        }
    }
    static ['OnBattleManagerPvPCommand'](_0x74ace9) {
        var _0x35bf82, _0x433bd0, _0x2e62b7, _0x49da15, _0x5c92c9;
        try {
            _0x35bf82 = function (_0x246bd3) {
                if (_0x3ba0('0x86') === _0x3ba0('0x87')) {
                    if (!Network['isMultiMode']()) {
                        return;
                    }
                    ServerManager[_0x3ba0('0x20')](_0x74ace9[_0x3ba0('0x41')]);
                    mapId = _0x74ace9['data'];
                    if (ServerManager['mapOwnerPool'][mapId] == null) {
                        ServerManager['mapOwnerPool'][mapId] = _0x74ace9[_0x3ba0('0x41')];
                        _0x433bd0 = ServerManager[_0x3ba0('0x64')](_0x74ace9[_0x3ba0('0x41')]);
                        if (_0x433bd0 != null) {
                            NetMessage[_0x3ba0('0x7b')](_0x433bd0)[_0x3ba0('0x19')]();
                        }
                    }
                } else {
                    var _0x433bd0, _0x2e1ce0;
                    _0x2e1ce0 = NetPartyManager[_0x3ba0('0x80')](_0x246bd3);
                    _0x433bd0 = ServerManager[_0x3ba0('0x64')](_0x2e1ce0['id']);
                    return _0x433bd0;
                }
            };
            _0x49da15 = _0x74ace9[_0x3ba0('0x3b')];
            _0x2e62b7 = _0x49da15['id'];
            'BATTLE\x20:\x20MANAGER\x20PVP'['p'](_0x2e62b7);
            if (_0x2e62b7 === _0x3ba0('0x88')) {
                _0x433bd0 = _0x35bf82(_0x49da15[_0x3ba0('0x89')]);
                NetMessage[_0x3ba0('0x8a')](_0x433bd0)[_0x3ba0('0x19')](_0x49da15);
                return;
            }
            if (_0x2e62b7 === _0x3ba0('0x8b')) {
                _0x433bd0 = _0x35bf82(_0x49da15[_0x3ba0('0x7d')]);
                NetMessage[_0x3ba0('0x8a')](_0x433bd0)[_0x3ba0('0x19')](_0x49da15);
                return;
            }
            if (_0x2e62b7 === _0x3ba0('0x8c')) {
                _0x433bd0 = _0x35bf82(_0x49da15[_0x3ba0('0x89')]);
                NetMessage['BattleManagerPvP'](_0x433bd0)[_0x3ba0('0x19')](_0x49da15);
                return;
            }
            if (_0x2e62b7 === _0x3ba0('0x8d')) {
                _0x433bd0 = _0x35bf82(_0x49da15[_0x3ba0('0x89')]);
                NetMessage['BattleManagerPvP'](_0x433bd0)[_0x3ba0('0x19')](_0x49da15);
                return;
            }
            if (_0x2e62b7 === _0x3ba0('0x8e')) {
                _0x433bd0 = _0x35bf82(_0x49da15[_0x3ba0('0x89')]);
                NetMessage[_0x3ba0('0x8a')](_0x433bd0)['send'](_0x49da15);
            }
        } catch (_0x57390c) {
            _0x5c92c9 = _0x57390c;
            return Network['error'](_0x5c92c9, _0x3ba0('0x8f'));
        }
    }
};
AlphaNET['register'](ServerManager);
})();

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

(function () {
    //@[DEFINES]
    var _ = BattleManager;

    //@[ALIAS]
    var _alias__startBattle = _.startBattle;
    _.startBattle = function () {
        _alias__startBattle.call(this, ...arguments);
        if (BattleManager.isNetworkBattleServer())
            $gameParty.refreshForNetwork();
        if(BattleManager.isNetworkBattlePvP()) {
            BattleManager._battlersMakeTurns = 0;
            BattleManager._battlersMakeInput = 0;
        }
    };

    //@[ALIAS]
    var _alias__isBusy = _.isBusy;
    _.isBusy = function () {
        var result = _alias__isBusy.call(this, ...arguments);
        return result || Network.isBusy();
    };

    //@[ALIAS]
    var _alias__updateTurn = _.updateTurn;
    _.updateTurn = function () {
        if(BattleManager.isNetworkBattlePvP()) {
            $gameParty.requestMotionRefresh();
        } else {
            if (!BattleManager.isNetworkBattle()) {
                _alias__updateTurn.call(this, ...arguments);
                return;
            }
            if (BattleManager.isNetworkBattleServer()) {
                // * Только на сервере происходит обновление хода
                _alias__updateTurn.call(this, ...arguments);
            } else
                $gameParty.requestMotionRefresh();
        }
    };

    //@[ALIAS]
    var _alias__startTurn = _.startTurn;
    _.startTurn = function () {
        if(BattleManager.isNetworkBattlePvP()) {
            this._phase = 'turn';
            this.clearActor();
            $gameTroop.increaseTurn();
            $gameParty.requestMotionRefresh();
            this._logWindow.startTurn();
            this._startTurnPvP();
        } else {
            _alias__startTurn.call(this, ...arguments);
            if (BattleManager.isNetworkBattleServer()) {
                this._sendBattleOrderToNetwork();
            }
        }
    };

    //@[ALIAS]
    var _alias__setup = _.setup;
    _.setup = function () {
        if (Network.isConnected())
            Network._inBattle = true;
        _alias__setup.call(this, ...arguments);
        if(BattleManager.isNetworkBattleServer()) {
            this._sendTroopNetworkIds();
        }
    };

    //@[ALIAS]
    var _alias__endAction = _.endAction;
    _.endAction = function () {
        _alias__endAction.call(this, ...arguments);
        if(BattleManager.isNetworkBattleServer()) {
            this._sendActionEndToNetwork();
        }
        if(BattleManager.isNetworkBattlePvP()){
            this._sendEndActionPvPToServer();
        }
    };

    //@[ALIAS]
    var _alias__endTurn = _.endTurn;
    _.endTurn = function () {
        if (BattleManager.isNetworkBattleServer()) {
            this._sendTurnEndToNetwork();
        }
        _alias__endTurn.call(this, ...arguments);
        if (BattleManager.isNetworkBattle())
            BattleManager.syncNet();
    };

    // * Данный метод работает только на сервере
    //@[ALIAS]
    var _alias__processTurn = _.processTurn;
    _.processTurn = function () { 
        if(BattleManager.isNetworkBattlePvP()) {
            var subject = this._subject;
            var action = subject.currentAction();
            _alias__processTurn.call(this, ...arguments);
            if(!action) {
                BattleManager._battlersMakeTurns++;
                //"ON ALL END".p();
                BattleManager._checkTurnEndPvP();
            }
            //BattleManager._processTurnPvP();
            return;
        }
        if (!BattleManager.isNetworkBattle()) {
            _alias__processTurn.call(this, ...arguments);
            return;
        }
        if(BattleManager.isNetworkBattleServer()) {
            var subject = this._subject;
            var action = subject.currentAction();
            _alias__processTurn.call(this, ...arguments);
            if (!action) {
                this._sendProcessTurnToNetwork(subject);
            }
        }
    };

    // * Данный метод работает только на сервере (от processTurn)
    //@[ALIAS]
    var _alias__startAction = _.startAction;
    _.startAction = function () {
        if (BattleManager.isNetworkBattlePvP()) {
            _alias__startAction.call(this, ...arguments);
            BattleManager._sendStartActionPvPToNetwork();
            return;
        }
        if (!BattleManager.isNetworkBattle()) {
            _alias__startAction.call(this, ...arguments);
            return;
        }
        if (BattleManager.isNetworkBattleServer()) {
            _alias__startAction.call(this, ...arguments);
            this._sendStartActionToNetwork(this._targets);
        }
    };

    //TODO: Временно!
    // * Временно отключил его для сети
    //@[ALIAS]
    var _alias__displayStartMessages = _.displayStartMessages;
    _.displayStartMessages = function () {
        if(BattleManager.isNetworkBattle()) {
            return;
        }
        _alias__displayStartMessages.call(this, ...arguments);  
    };

    // * Данный метод работает только на сервере (от startAction)
    //@[ALIAS]
    var _alias__invokeNormalAction = _.invokeNormalAction;
    _.invokeNormalAction = function (subject, target) {
        if(BattleManager.isNetworkBattlePvP()){
            BattleManager._invokeNormalActionPvP(subject, target);
            return;
        }
        if (BattleManager.isNetworkBattle()) {
            var realTarget = this.applySubstitute(target);
            _alias__invokeNormalAction.call(this, ...arguments);
            $gameParty.refreshForNetwork();
            if(BattleManager.isNetworkBattleServer()) {
                this._sendInvokeNormalToNetwork(subject, realTarget);
            }
        } else {
            _alias__invokeNormalAction.call(this, ...arguments);
        }
    };

    //TODO: invokeCounterAttack
    // * Данный метод работает только на сервере (от startAction)
    //@[ALIAS]
    var _alias__invokeCounterAttack = _.invokeCounterAttack;
    _.invokeCounterAttack = function (subject, target) {
        if (!BattleManager.isNetworkBattle()) {
            _alias__invokeCounterAttack.call(this, ...arguments);
            return;
        }
        // * Пока Counter Attack не реализована, обычная  NormalAction
        if (BattleManager.isNetworkBattleServer()) {
            this.invokeNormalAction(subject, target);
        }
    };

    //TODO: invokeMagicReflection
    // * Данный метод работает только на сервере (от startAction)
    //@[ALIAS]
    var _alias__invokeMagicReflection = _.invokeMagicReflection;
    _.invokeMagicReflection = function (subject, target) {
        if (!BattleManager.isNetworkBattle()) {
            _alias__invokeMagicReflection.call(this, ...arguments);
            return;
        }
        // * Пока Magic Reflection не реализована, обычная  NormalAction
        if (BattleManager.isNetworkBattleServer()) {
            this.invokeNormalAction(subject, target);
        }
    };

    //@[ALIAS]
    BattleManager._alias__selectNextCommand = _.selectNextCommand;
    _.selectNextCommand = function () {
        if (!BattleManager.isNetworkBattle()) {
            this._alias__selectNextCommand.call(this, ...arguments);
            return;
        }
        this._selectInputCommandNetwork('next');
    };

    //@[ALIAS]
    BattleManager._alias__selectPreviousCommand = _.selectPreviousCommand;
    _.selectPreviousCommand = function () {
        if (!BattleManager.isNetworkBattle()) {
            this._alias__selectPreviousCommand.call(this, ...arguments);
            return;
        }
        this._selectInputCommandNetwork('prev');
    };


    //@[ALIAS]
    var _alias__endBattle = _.endBattle;
    _.endBattle = function (result) {
        if(BattleManager.isNetworkBattlePvP()) {
            Network.clearPvPBattleWithResult(result);
            _alias__endBattle.call(this, ...arguments);
            return;
        }
        if (BattleManager.isNetworkBattle()) {
            BattleManager.syncNet();
            _alias__endBattle.call(this, ...arguments);
        } else {
            _alias__endBattle.call(this, ...arguments);
        }
    };

    // * Данный метод работает только на сервере
    //@[ALIAS]
    var _alias__checkBattleEnd = _.checkBattleEnd;
    _.checkBattleEnd = function () {
        if (BattleManager.isNetworkBattle()) {
            if (BattleManager.isNetworkBattleServer()) {
                return _alias__checkBattleEnd.call(this, ...arguments);
            } else {
                return false;
            }
        } else 
            return _alias__checkBattleEnd.call(this, ...arguments);
    };

    // * Данный метод работает только на сервере (из checkBattleEnd)
    //@[ALIAS]
    var _alias__checkAbort = _.checkAbort;
    _.checkAbort = function () {
        if (BattleManager.isNetworkBattle()) {
            if ($gameParty.isEmpty() || this.isAborting()) {
                SoundManager.playEscape();
                this._escaped = true;
                this._sendAbortBattleToNetwork();
                this.processAbort();
            }
            return false;
        } else {
            return _alias__checkAbort.call(this);
        }
    };

    // * Данный метод работает только на сервере (из checkBattleEnd)
    //@[ALIAS]
    var _alias__processVictory = _.processVictory;
    _.processVictory = function () {
        if (BattleManager.isNetworkBattleServer()) {
            this._sendVictoryToNetwork();
        }
        _alias__processVictory.call(this, ...arguments);
    };

    // * Данный метод работает только на сервере (из checkBattleEnd)
    //@[ALIAS]
    var _alias__processDefeat = _.processDefeat;
    _.processDefeat = function () {
        if (BattleManager.isNetworkBattleServer()) {
            this._sendDefeatToNetwork();
        }
        _alias__processDefeat.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias__processEscape = _.processEscape;
    _.processEscape = function () {
        if (BattleManager.isNetworkBattle()) {
            return _alias__processEscape.call(this, ...arguments);
        } else {
            if (BattleManager.isNetworkBattleServer()) {
                var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
                this._sendEscapeToNetwork(success);
                this._onEscapeFromNetwork(success); // * Логика вынесена отдельно для севрера и клиента
                return success;
            }
            return false;
        }
    };

    //@[ALIAS]
    var _alias__invokeAction = _.invokeAction;
    _.invokeAction = function (subject, target) {
        if(BattleManager.isNetworkBattlePvP()) {
            BattleManager._invokeActionPvP(subject, target);
        } else
            _alias__invokeAction.call(this, subject, target);
    };

})();

// ■ END BattleManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ BattleManager_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[NEW]
BattleManager.setupPvPBattle = function (enemyActorId) {
    this.initMembers();
    this._canEscape = false;
    this._canLose = true;
    $gameTroop.setupPvPBattle(enemyActorId);
    $gameScreen.onBattleStart();
    this.makeEscapeRatio();
    Network._inPvPBattle = true;
    Network._lastPvPResult = -1;
};

//?[NEW]
BattleManager.isNetworkBattlePvP = function () {
    if (Network.isConnected() && Network.isMultiMode() && Network.inPvPBattle()) {
        return true;
    }
    return false;
};

//?[NEW]
BattleManager.isNetworkBattlePvPServer = function () {
    return BattleManager.isNetworkBattlePvP() && Network.isPvPBattleServer();
};

//?[NEW]
BattleManager.isNetworkBattle = function () {
    if(Network.isMultiMode()) {
        return false;
    } else
        return Network.isConnected() && Network.inBattle();
};

//?[NEW]
BattleManager.isNetworkBattleServer = function () {
    return BattleManager.isNetworkBattle() && Network.isHost();
};

//?[NEW]
BattleManager.convertBattlersToIds = function (arrayOfBattlers) {
    return arrayOfBattlers.map(item => {
        return BattleManager.getIdByBattleSubject(item);
    });
};

//?[NEW]
BattleManager.convertIdsToBattlers = function (arrayOfIds) {
    return arrayOfIds.map(item => {
        return BattleManager.getBattleSubjectById(item);
    });
};

//?[NEW]
BattleManager.getBattleSubjectById = function (id) {
    if(BattleManager.isNetworkBattlePvP()) {
        if(id == $gameParty.leader().actorId()) {
            return $gameParty.leader();
        } else {
            return $gameTroop.rival();
        }
    } else {
        if (id < 900)
            return $gameParty.memberByActorId(id);
        else
            return $gameTroop.getEnemyByNetId(id);
    }
};

//?[NEW]
BattleManager.getIdByBattleSubject = function (subject) {
    if (subject == null)
        subject = this._subject;
    if (subject.isActor()) {
        return subject.actorId();
    } else {
        return subject.uniqueNetworkId();
    }
};

//?[NEW]
BattleManager.isMyActorInput = function () {
    if (!BattleManager.isNetworkBattle()) return true;
    var myIndex = $gameParty.memberIndexByActorId(NetPartyManager.getMyActorId());
    return myIndex == this._actorIndex;
};

//?[NEW]
BattleManager.syncNet = function () {
    if (BattleManager.isNetworkBattle()) {
        Network.requestSync();
    }
};

//?[NEW]
BattleManager._processTurnFromNetwork = function (subjectId) {
    try {
        var subject = this.getBattleSubjectById(subjectId);
        subject.onAllActionsEnd();
        this.refreshStatus();
        this._logWindow.displayAutoAffectedStatus(subject);
        this._logWindow.displayCurrentState(subject);
        this._logWindow.displayRegeneration(subject);
    } catch (error) {
        AlphaNET.error(error, ' processTurnFromNetwork');
    }
};

//?[NEW]
BattleManager._startActionFromNetwork = function (targets) {
    this._startActionFromNetworkDefault(targets);
};

//?[NEW]
BattleManager._startActionFromNetworkDefault = function (targets) {
    try {
        this._subject = this.getNextSubject();
        if (this._subject == null) {
            return;
        }
        this._action = this._subject.currentAction();
        this._subject.useItem(this._action.item());
        this.refreshStatus();
        this._action.applyGlobal();
        this._targets = this.convertIdsToBattlers(targets);
    } catch (error) {
        AlphaNET.error(error, ' startActionFromNetwork  : DEFAULT');
        return;
    }
    if (this._targets.length > 0) {
        try {
            this._logWindow.startAction(this._subject, this._action, this._targets);
        } catch (error) {
            console.error(error);
        }
    }
};

//?[NEW]
BattleManager._selectInputCommandFromNetwork = function (commnadName) {
    try {
        if (commnadName == 'next')
            this._alias__selectNextCommand.call(this);
        else
            this._alias__selectPreviousCommand.call(this);
    } catch (error) {
        AlphaNET.error(error, ' _selectInputCommandFromNetwork');
        this._alias__selectNextCommand.call(this);
    }
};

//?[NEW]
BattleManager._invokeNormalActionFromNetwork = function (subjectId, targetId) {
    try {
        var subject = this.getBattleSubjectById(subjectId);
        var target = this.getBattleSubjectById(targetId);
        this._logWindow.displayActionResults(subject, target);
    } catch (error) {
        AlphaNET.error(error, 'invokeNormalActionFromNetwork');
    }
};

//?[NEW]
BattleManager._abortBattleCommandFromNetwork = function () {
    SoundManager.playEscape();
    this._escaped = true;
    this.processAbort();
};

//?[NEW]
BattleManager._onEscapeFromNetwork = function (success) {
    $gameParty.performEscape();
    SoundManager.playEscape();
    if (success) {
        this.displayEscapeSuccessMessage();
        this._escaped = true;
        this.processAbort();
    } else {
        this.displayEscapeFailureMessage();
        this._escapeRatio += 0.1;
        $gameParty.clearActions();
        this.startTurn();
    }
};

//?[NEW]
BattleManager._sendBattleOrderToNetwork = function () {
    var orderData = this.convertBattlersToIds(BattleManager._actionBattlers);
    //console.info(BattleManager._actionBattlers);
    var data = NetMessage.CreateSubMessageData('battleOrder');
    data.orderData = orderData;
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendNetworkMsg = function (data) {
    Network.sendMessage(NetMessage.BattleManager().setData(data));
};

//?[NEW]
BattleManager._sendTroopNetworkIds = function () {
    var troopIds = $gameTroop.members().map(item => item.uniqueNetworkId());
    var data = NetMessage.CreateSubMessageData('enemyIds');
    data.troopIds = troopIds;
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendActionEndToNetwork = function () {
    this._sendNetworkMsg(NetMessage.CreateSubMessageData('endAction'));
};

//?[NEW]
BattleManager._sendTurnEndToNetwork = function () {
    this._sendNetworkMsg(NetMessage.CreateSubMessageData('endTurn'));
};

//?[NEW]
BattleManager._sendProcessTurnToNetwork = function (subject) {
    var data = NetMessage.CreateSubMessageData('processTurn');
    data.subjectId = this.getIdByBattleSubject(subject);
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendStartActionToNetwork = function (targets) {
    var data = NetMessage.CreateSubMessageData('startAction');
    data.targets = this.convertBattlersToIds(targets);
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendInvokeNormalToNetwork = function (subject, target) {
    var data = NetMessage.CreateSubMessageData('invokeNormal');
    data.subjectId = this.getIdByBattleSubject(subject);
    data.targetId = this.getIdByBattleSubject(target);
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._selectInputCommandNetwork = function (commandName) {
    var method = this._alias__selectNextCommand;
    if (commandName == 'prev')
        method = this._alias__selectPreviousCommand;
    if (this.actor()) {
        if (BattleManager.isMyActorInput()) {
            method.call(this);
            Network.sendMessage(NetMessage.BattleInputCommand().setData(commandName));
        }
    } else {
        method.call(this);
    }
};

//?[NEW]
BattleManager._sendAbortBattleToNetwork = function () {
    var data = NetMessage.CreateSubMessageData('abortBattle');
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendVictoryToNetwork = function () {
    var data = NetMessage.CreateSubMessageData('victory');
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendDefeatToNetwork = function () {
    var data = NetMessage.CreateSubMessageData('defeat');
    this._sendNetworkMsg(data);
};

//?[NEW]
BattleManager._sendEscapeToNetwork = function (success) {
    var data = NetMessage.CreateSubMessageData('escape');
    data.success = success;
    this._sendNetworkMsg(data);
};

// * DEPRECATED
//?[NEW]
BattleManager.isWaitInputtingForPvP = function () {
    return this._waitInputPvP === true;
};

// * NOT USED
//?[NEW]
BattleManager._onPvPStartInputCommandFromServer = function() {
    this._waitInputPvP = false;
};

//?[NEW]
BattleManager._startTurnPvP = function() {
    ///"StartTurnPvP".p();
    BattleManager._battlersMakeTurns = 0;
    BattleManager._battlersMakeInput++;
    //console.info($gameParty.leader().currentAction());
    if (BattleManager.isNetworkBattlePvPServer()) {
        //WAIT ANOTHER ACTOR INPUT FROM SERVER
        if (BattleManager._battlersMakeInput == 2) {
            BattleManager._startPvP();
        }
    } else {
        //SEND MY INPPUTING ACTION
        BattleManager._sendInputActionPvPToServer($gameParty.leader().currentAction());
    }
};

//?[NEW]
BattleManager._sendInputActionPvPToServer = function (action) {
    if(!this.isNetworkBattlePvP()) return;
    var data = BattleManager._collectBasicPvPData('inputActionPvP');
    data.action = JsonEx.stringify(action);
    this._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._collectBasicPvPData = function (commandName) {
    var data = NetMessage.CreateSubMessageData(commandName);
    data.myActorId = $gameParty.leader().actorId();
    data.myRivalActorId = $gameTroop.rival().actorId();
    return data;
};

//?[NEW]
BattleManager._sendNetworkMsgPvP = function (data) {
    Network.sendMessage(NetMessage.BattleManagerPvP().setData(data));
};

//?[NEW]
BattleManager._setPvPRivalActionFromNetwork = function (action) {
    $gameTroop.rival()._actions[0] = action;
    BattleManager._battlersMakeInput++;
    if (BattleManager.isNetworkBattlePvPServer()) {
        if(BattleManager._battlersMakeInput == 2)
            BattleManager._startPvP();
    }
};

//?[NEW]
BattleManager._startPvP = function () {
    BattleManager._battlersMakeInput = 0;
    BattleManager.makeActionOrders();
    //BattleManager._actionBattlers = [$gameParty.leader(), $gameTroop.rival()];
    ///"START".p(BattleManager._actionBattlers[0].name());
    BattleManager._sendStartTurnPvPToServer(BattleManager._actionBattlers[0].actorId());
};

//?[NEW]
BattleManager._sendStartTurnPvPToServer = function (actorId) {
    var data = BattleManager._collectBasicPvPData('startTurnPvP');
    data.whoStart = actorId;
    BattleManager._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._startPvPTurnFromNetwork = function() {
    //"START PVP TURN FROM NETWORK".p();
    BattleManager._actionBattlers = [$gameParty.leader(), $gameTroop.rival()];
    BattleManager._subject = BattleManager._actionBattlers[0];
    BattleManager.processTurn();
};

//?[NEW]
BattleManager._sendStartActionPvPToNetwork = function() {
    var data = BattleManager._collectBasicPvPData('startActionPvP');
    data.subjectId = $gameParty.leader().actorId();
    data.action = JsonEx.stringify(BattleManager._action);
    data.targets = BattleManager.convertBattlersToIds(BattleManager._targets);
    BattleManager._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._startActionFromNetworkPvP = function(subjectId, action, targetsIds) {
    //"START ACTION FROM NETWORK".p();
    var subject = BattleManager.getBattleSubjectById(subjectId);
    var targets = BattleManager.convertIdsToBattlers(targetsIds);
    BattleManager._logWindow.startAction(subject, action, targets);
};

//?[NEW]
// * Только Normal Action
//TODO: Magic Reflection, CounterAttack
BattleManager._invokeActionPvP = function (subject, target) {
    this._logWindow.push('pushBaseLine');
    this.invokeNormalAction(subject, target);
    subject.setLastTarget(target);
    this._logWindow.push('popBaseLine');
    this.refreshStatus();
};

//?[NEW]
BattleManager._invokeNormalActionPvP = function (subject, target) {
    this._action.apply(target);
    this._logWindow.displayActionResults(subject, target);

    var data = BattleManager._collectBasicPvPData('invokeNormalActionPvP');
    data.subjectId = subject.actorId();
    data.targetId = target.actorId();
    data.resultSubject = JsonEx.stringify(subject.result());
    data.resultTarget = JsonEx.stringify(target.result());
    BattleManager._sendNetworkMsgPvP(data);
};

//?[NEW]
BattleManager._invokeNormalActionFromNetworkPvP = function (subjectId, targetId, subResult, tarResult) {
    //"NORMAL ACTION FROM NETWORK".p();
    BattleManager._logWindow.push('pushBaseLine');
    var subject = BattleManager.getBattleSubjectById(subjectId);
    var target = BattleManager.getBattleSubjectById(targetId);
    subject._result = subResult;
    target._result = tarResult;
    BattleManager._logWindow.displayActionResults(subject, target);
    BattleManager._logWindow.push('popBaseLine');
    BattleManager.refreshStatus();
};

//?[NEW]
BattleManager._sendEndActionPvPToServer = function() {
    ///"END ACTION -> SERVER".p();
    var data = BattleManager._collectBasicPvPData('endActionPvP');
    data.subjectData = JsonEx.stringify($gameParty.leader()._collectDataPvPForNetwork());
    data.targetData = JsonEx.stringify($gameTroop.rival()._collectDataPvPForNetwork());
    BattleManager._sendNetworkMsgPvP(data);
    BattleManager.processTurn();
};

//?[NEW]
BattleManager._actionEndPvPFromNetwork = function(targetData, partyLeaderData) {
    //"END ACTION FROM SERVER".p();
    BattleManager._logWindow.endAction($gameTroop.rival());
    BattleManager.refreshStatus();
    BattleManager._battlersMakeTurns++;
    $gameParty.leader()._onNetworkPvPData(partyLeaderData);
    $gameTroop.rival()._onNetworkPvPData(targetData);
    if(BattleManager._battlersMakeTurns == 1) {
        // * Так как это пришло от сервера, значит следующий ход - мой
        BattleManager._sendStartTurnPvPToServer($gameParty.leader().actorId());
    } else
        BattleManager._checkTurnEndPvP();
};

//?[NEW]
BattleManager._checkTurnEndPvP = function () {
    if (BattleManager._battlersMakeTurns == 2) {
        //"END TURN".p();
        BattleManager._battlersMakeTurns = 0;
        BattleManager.endTurn();
    }
};

//TODO: СБОС ФЛАГОВ PVP в NETWORK!!

// ■ END BattleManager_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    //@[ALIAS]
    var _alias_DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = _alias_DataManager_makeSaveContents.call(this, ...arguments);
        try {
            if (Network.isConnected()) {
                if (Network.isHost() && Network.sessionData != null) {
                    contents.network = Network.sessionData.makeSaveContents();
                }
            }
        } catch (error) {
            AlphaNET.error(error, ' create network world save data');
        }
        return contents;
    };

    //@[ALIAS]
    var _alias_DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        _alias_DataManager_extractSaveContents.call(this, ...arguments);
        try {
            if (contents.network != null) {
                if (Network.sessionData == null)
                    Network.sessionData = new AlphaNET.LIBS.NetSessionData();
                Network.sessionData.extractSaveContents(contents.network);
            }
        } catch (error) {
            AlphaNET.error(error, ' load network world save data');
        }
    };

    //@[ALIAS]
    var _alias_DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        _alias_DataManager_createGameObjects.call(this, ...arguments);
        AlphaNET.ExtraPluginSupport();
    };

})();
// ■ END DataManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager_PRO.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        _alias_DataManager_setupNewGame.call(this);
        try {
            if (Utils.isNwjs()) {
                FontLoadManager.init();
                FontLoadManager.loadAll();
            }
        } catch (error) {
            FontLoadManager._ready = true;
            AlphaNET.warning('something wrong with load text fonts');
        }
    };
})();
// ■ END DataManager_PRO.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ExtraPluginsSupport.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
AlphaNET.ExtraPluginSupport = (function () {

    // * Yanfly Engine Plugins - Item Core
    (function(){
        if (Imported.YEP_ItemCore == null)
            return;
        try {
            //@[ALIAS]
            var _alias_Game_Party_getDataForNetwork = Game_Party.prototype.getDataForNetwork;
            Game_Party.prototype.getDataForNetwork = function () {
                var result = _alias_Game_Party_getDataForNetwork.call(this, ...arguments);
                
                var weapons = {};
                for (const [key, value] of Object.entries($gameParty._weapons)) {
                    var newKey = Number(key) - Yanfly.Param.ItemStartingId;
                    weapons[newKey] = value;
                }
                result.weapons = JSON.stringify(weapons);

                var armors = {};
                var realArmors = $gameParty.armors();
                for(var i = 0; i<realArmors.length; i++) {
                    var baseId = DataManager.getBaseItem(realArmors[i]).id;
                    if (armors[baseId] == null)
                        armors[baseId] = 1;
                    else
                        armors[baseId] += 1;
                }
                result.armors = JSON.stringify(armors);

                return result;
            };

            //$[OVER]
            Game_Party.prototype._setArmorsFromNetwork = function (armors) {
                if (armors != null) {
                    try {
                        var temp = JSON.parse(armors);
                        for (const [key, value] of Object.entries(temp)) {
                            var item = $dataArmors[Number(key)];
                            $gameParty.gainItem(item, value);
                        }
                    } catch(error) {
                        AlphaNET.error(error, ' load player armors from Network');
                    }
                }
            };


        } catch(error) {
            AlphaNET.warning('Alpha NET compatibility for YEP_ItemCore.js not loaded!');
        }
    })();

});
// ■ END ExtraPluginsSupport.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//?{FROM ALPHA ABS}
//------------------------------------------------------------------------------
//FontLoadManager
var FontLoadManager = function () {
    throw new Error('This is a static class');
};
FontLoadManager.init = function () {
    var fs = require('fs');
    this._files = fs.readdirSync(this.localFileDirectoryPath());
    this._ready = false;
};

FontLoadManager.isReady = function () {
    return (this._ready == true);
};

FontLoadManager.loadAll = function () {
    for (var i = 0; i < this._files.length; i++) {
        if (this._files[i].includes('.ttf') || this._files[i].includes('.TTF')) {
            console.log("Loaded font: " + this._files[i]);
            var name = this._files[i].substring(0, this._files[i].length - 4);
            var url = this.localFileDirectoryPath() + this._files[i];
            url = url.replaceAll("\\", "\\\\");
            Graphics.loadFont(name, url);
        }
    }
    this._ready = true;
};

FontLoadManager._localFileDirectoryPath = null;
FontLoadManager.localFileDirectoryPath = function () {
    if (this._localFileDirectoryPath == null) {
        const path = require('path');
        const base = path.dirname(process.mainModule.filename);
        this._localFileDirectoryPath = path.join(base, 'fonts/');
    }
    return this._localFileDirectoryPath;
};
//END FontLoadManager
//------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        _alias_Game_Action_apply.call(this, ...arguments);
        if(BattleManager.isNetworkBattleServer()) {
            this._sendActionResultToNetwork(target);
        }
    };

    //@[ALIAS]
    var _alias_Game_Action_setSkill = Game_Action.prototype.setSkill;
    Game_Action.prototype.setSkill = function (skillId) {
        _alias_Game_Action_setSkill.call(this, ...arguments);
        if (BattleManager.isNetworkBattle()) {
            this._sendSetActionSkillToNetwork(skillId);
        }
        this._outerCall = false;
    };

    //@[ALIAS]
    var _alias_Game_Action_setItem = Game_Action.prototype.setItem;
    Game_Action.prototype.setItem = function (itemId) {
        _alias_Game_Action_setItem.call(this, ...arguments);
        if (BattleManager.isNetworkBattle()) {
            this._sendSetActionItemToNetwork(itemId);
        }
        this._outerCall = false;
    };

    //@[ALIAS]
    var _alias_Game_Action_setTarget = Game_Action.prototype.setTarget;
    Game_Action.prototype.setTarget = function (targetIndex) {
        _alias_Game_Action_setTarget.call(this, ...arguments);
        if (BattleManager.isNetworkBattle()) {
            this._sendSetActionTargetToNetwork(targetIndex);
        }
        this._outerCall = false;
    };

    //?[NEW]
    Game_Action.prototype.setSkillFromNet = function (skillId) {
        this._outerCall = true;
        "Game_Action: Skill set from Net".p(skillId);
        this.setSkill(skillId);
    };

    //?[NEW]
    Game_Action.prototype.setItemFromNet = function (itemId) {
        this._outerCall = true;
        "Game_Action: Item set from Net".p(itemId);
        this.setItem(itemId);
    };

    //?[NEW]
    Game_Action.prototype.setTargetFromNet = function (targetIndex) {
        this._outerCall = true;
        "Game_Action: Target set from Net".p(targetIndex);
        this.setTarget(targetIndex);
    };

    //@[ALIAS]
    var _alias_Game_Action_setSubject = Game_Action.prototype.setSubject;
    Game_Action.prototype.setSubject = function (subject) {
        if(BattleManager.isNetworkBattlePvP()) {
            this._subjectActorId = subject.actorId();
            this._subjectEnemyIndex = -1;
        } else
            _alias_Game_Action_setSubject.call(this, subject);
    };

    //@[ALIAS]
    var _alias_Game_Action_subject = Game_Action.prototype.subject;
    Game_Action.prototype.subject = function () {
        if (BattleManager.isNetworkBattlePvP()) {
            if (this._subjectActorId == $gameParty.leader().actorId()) {
                return $gameParty.leader();
            } else {
                return $gameTroop.rival();
            }
        } else
            return _alias_Game_Action_subject.call(this);
    };

})();
// ■ END Game_Action.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Action_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Action.prototype;
  _._sendActionResultToNetwork = function(target) {
    var data;
    if (BattleManager._phase !== 'action') {
      return;
    }
    data = NetMessage.CreateSubMessageData('setResult');
    data.sbj = BattleManager.getIdByBattleSubject(this.subject());
    data.target = BattleManager.getIdByBattleSubject(target);
    data.result = target.result();
    this._sendActionNetMsg(data);
  };
  _._sendActionNetMsg = function(data) {
    return Network.sendMessage(NetMessage.BattleAction().setData(data));
  };
  _._sendSetActionSkillToNetwork = function(skillId) {
    return this._createActionNetMessage('setSkill', skillId);
  };
  _._createActionNetMessage = function(name, actionId) {
    var data;
    if (this._outerCall === true) {
      return;
    }
    if (!(this._subjectActorId > 0)) {
      return;
    }
    data = NetMessage.CreateSubMessageData(name);
    data.actionId = actionId;
    data.actorId = this._subjectActorId;
    this._sendActionNetMsg(data);
  };
  _._sendSetActionItemToNetwork = function(itemId) {
    return this._createActionNetMessage('setItem', itemId);
  };
  _._sendSetActionTargetToNetwork = function(targetIndex) {
    return this._createActionNetMessage('setTarget', targetIndex);
  };
})();

// ■ END Game_Action_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_ActionResult_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[NEW]
Game_ActionResult.prototype.setupFromOuterData = function (data) {
    var item = this;
    Object.getOwnPropertyNames(data).forEach(function (key, index) {
        item[key] = data[key];
    });
};
// ■ END Game_ActionResult_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function () {
        _alias_Game_Actor_refresh.call(this, ...arguments);
        if (this._isNeedNetworkRefresh()) {
            this._sendRefreshMessageToNetwork(this.actorId());
        }
    };

    //@[ALIAS]
    var _alias_Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function () {
        _alias_Game_Actor_initMembers.call(this, ...arguments);
        this._networkNameplateStyleId = null;
    };

    //?[NEW]
    Game_Actor.prototype.networkStyleId = function () {
        return this._networkNameplateStyleId;
    };

    //?[NEW]
    Game_Actor.prototype._collectDataPvPForNetwork = function () {
        var data = {};
        data._hp = this._hp;
        data._mp = this._mp;
        data._tp = this._tp;
        data._paramPlus = this._paramPlus;
        data._states = this._states;
        data._stateTurns = this._stateTurns;
        data._buffs = this._buffs;
        data._buffTurns = this._buffTurns;
        return data;
    };

    //?[NEW]
    Game_Actor.prototype._onNetworkPvPData = function (data) {
        for (var key in data) {
            this[key] = data[key];
        }
    };
})();
// ■ END Game_Actor.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Actor_X.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//$[OVER]
Game_Actor.prototype.performDamage = function () {
    Game_Battler.prototype.performDamage.call(this);
    if (this.isSpriteVisible()) {
        this.requestMotion('damage');
    } else {
        if (this == $gameParty.leader())
            $gameScreen.startShake(5, 5, 10);
    }
    SoundManager.playActorDamage();
};
// ■ END Game_Actor_X.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    //TODO: Game_Battler.escape - не синхронизирован. Т.е. один игрок может  убежать, если у вещи есть
    //специальный эффект, но это не синхронизируется, бой встаёт!

    //@[ALIAS]
    var _alias_Game_Battler_consumeItem = Game_Battler.prototype.consumeItem;
    Game_Battler.prototype.consumeItem = function (item) {
        if (BattleManager.isNetworkBattle()) {
            if (this == $gameParty.leader()) {
                "CONSUME ITEM".p();
                _alias_Game_Battler_consumeItem.call(this, ...arguments);
            }
        } else {
            _alias_Game_Battler_consumeItem.call(this, ...arguments);
        }
    };

    //@[ALIAS]
    var _alias_Game_Battler_meetsItemConditions = Game_Battler.prototype.meetsItemConditions;
    Game_Battler.prototype.meetsItemConditions = function (item) {
        if (BattleManager.isNetworkBattle()) {
            if (this == $gameParty.leader()) {
                return _alias_Game_Battler_meetsItemConditions.call(this, item);
            } else {
                return this.meetsUsableItemConditions(item);
            }
        } else
            return _alias_Game_Battler_meetsItemConditions.call(this, item);
    };
})();
// ■ END Game_Battler.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Battler_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Battler.prototype;
  _._sendRefreshMessageToNetwork = function(netId) {
    var data, msg;
    data = this._collectDataForNetwork();
    data.id = netId;
    msg = NetMessage.BattleBattlerRefreshData().setData(data);
    Network.sendMessage(msg);
  };
  _._collectDataForNetwork = function() {
    var data;
    return data = {
      hp: this._hp,
      mp: this._mp,
      tp: this._tp,
      states: this._states
    };
  };
  _._isNeedNetworkRefresh = function() {
    var phase;
    if (BattleManager.isNetworkBattleServer()) {
      phase = BattleManager._phase;
      return phase === 'action' || phase === 'start';
    }
    return false;
  };
})();

// ■ END Game_Battler_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Game_Character_initMembers = Game_Character.prototype.initMembers;
    Game_Character.prototype.initMembers = function () {
        _alias_Game_Character_initMembers.call(this, ...arguments);
        this._networkIconId = 0;
    };
})();
// ■ END Game_Character.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Character_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

//?[NEW]
Game_Character.prototype.synchronizeFromNetwork = function (netCharData) {
    this.onNetworkCharacterData(netCharData.charData);
    this.locate(netCharData.locatePoint.x, netCharData.locatePoint.y);
    this.onNetworkDirectionData(netCharData.locatePoint.direction);
};

//?[NEW]
Game_Character.prototype.onNetworkCharacterData = function (characterData) {
    this.updateNetworkData(characterData);
};

//?[NEW]
Game_Character.prototype.updateNetworkData = function (characterData) {
    for (var key in characterData) {
        this[key] = characterData[key];
    }
};

//?[NEW]
Game_Character.prototype.onNetworkDirectionData = function (d) {
    this._direction = d;
};

//?[NEW]
Game_Character.prototype.collectDataForNetwork = function () {
    var data = this._collectDataForNetwork();
    data.locatePoint = {
        x: this._x,
        y: this._y,
        direction: this._direction
    };
    return data;
};

//?[NEW]
Game_Character.prototype._collectDataForNetwork = function () {
    var data = {};
    data.charData = this._collectCharDataForNetwork();
    data.moveData = this._collectMoveDataForNetwork();
    return data;
};

//?[NEW]
Game_Character.prototype._collectCharDataForNetwork = function () {
    var data = {};
    data._moveSpeed = this.realMoveSpeed();
    data._opacity = this.opacity();
    data._blendMode = this.blendMode();
    data._walkAnime = this.hasWalkAnime();
    data._stepAnime = this.hasStepAnime();
    data._directionFix = this.isDirectionFixed();
    data._transparent = this.isTransparent();
    data._direction = this._direction;
    return data;
};

//?[NEW]
Game_Character.prototype._collectMoveDataForNetwork = function () {
    return {
        x: this.x,
        y: this.y
    };
};

//?[NEW]
Game_Character.prototype.onNetworkMoveData = function (moveData) {
    this._moveFromNetwork(moveData);
};

//?[NEW]
Game_Character.prototype._moveFromNetwork = function (point) {
    try {
        var sx = this.deltaXFrom(point.x);
        var sy = this.deltaYFrom(point.y);
        if (sx !== 0 && sy !== 0) {
            this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
        } else if (sx !== 0) {
            this._moveStraightNetwork(sx > 0 ? 4 : 6);
        } else if (sy !== 0) {
            this._moveStraightNetwork(sy > 0 ? 8 : 2);
        }
    } catch (e) {

    }
};

//?[NEW]
Game_Character.prototype._moveStraightNetwork = function (d) {
    this.setMovementSuccess(true);
    this.setDirection(d);
    this._x = $gameMap.roundXWithDirection(this._x, d);
    this._y = $gameMap.roundYWithDirection(this._y, d);
    this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
    this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
    this.increaseSteps();
};

//?[NEW]
Game_Character.prototype.networkIconId = function () {
    if (this.isTransparent())
        return -1;
    else
        return this._networkIconId;
};

//?[NEW]
Game_Character.prototype._startNetworkIcon = function () {
    this._networkIconId = 0;
};

//?[NEW]
Game_Character.prototype.showNetworkIcon = function (iconId) {
    this._networkIconId = iconId;
};

//?[NEW]
Game_Character.prototype.getNetworkName = function() {
    return null;
};

//?[NEW]
Game_Character.prototype.getNetworkNameStyleId = function() {
    return null;
};
// ■ END Game_Character_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Enemy.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Enemy_setup = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function () {
        _alias_Game_Enemy_setup.call(this, ...arguments);
        if (BattleManager.isNetworkBattleServer()) {
            this._uniqueNetworkId = 901 + $gameTroop.members().length;
            "UID".p(this._uniqueNetworkId);
        }
    };

    //?[NEW]
    Game_Enemy.prototype.uniqueNetworkId = function () {
        return this._uniqueNetworkId;
    };

    //@[ALIAS]
    var _alias_Game_Enemy_refresh = Game_Enemy.prototype.refresh;
    Game_Enemy.prototype.refresh = function () {
        _alias_Game_Enemy_refresh.call(this, ...arguments);
        if (this._isNeedNetworkRefresh()) {
            this._sendRefreshMessageToNetwork(this.uniqueNetworkId());
        }
    };
})();
// ■ END Game_Enemy.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_EnemyPvP.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    function Game_EnemyPvP() {
        this.initialize.apply(this, arguments);
    }

    Game_EnemyPvP.prototype = Object.create(Game_Actor.prototype);
    Game_EnemyPvP.prototype.constructor = Game_EnemyPvP;

    Game_EnemyPvP.prototype.initialize = function (actorId, x, y) {
        Game_Actor.prototype.initialize.call(this, actorId);
        this._screenX = x;
        this._screenY = y;
    };

    //$[OVER FROM GAME_ACTOR]
    Game_EnemyPvP.prototype.setup = function (actorId) {
        Game_Actor.prototype.setup.call(this, actorId);
        this._setupFromActor();
    };

    //?[NEW]
    Game_EnemyPvP.prototype._setupFromActor = function () {
        var actor = $gameActors.actor(this._actorId);
        this._name = actor.name();
        this._nickname = actor.nickname();
        this._profile = actor.profile();
        this._classId = actor._classId;
        this._level = actor._level;
        
        this._characterName = actor.characterName();
        this._characterIndex = actor.characterIndex();
        this._faceName = actor.faceName();
        this._faceIndex = actor.faceIndex();
        this._battlerName = actor.battlerName();

        this._exp[this._classId] = actor._exp[this._classId];
        this._skills = actor._skills;
        this._equips = actor._equips;

        var data = actor._collectDataPvPForNetwork();
        this._onNetworkPvPData(data);
    };


    //?[BASE]
    Game_EnemyPvP.prototype.initMembers = function () {
        Game_Actor.prototype.initMembers.call(this);
        this._screenX = 0;
        this._screenY = 0;
    };

    //$[OVER FROM GAME_ACTOR]
    Game_EnemyPvP.prototype.isActor = function () {
        return false;
    };

    Game_EnemyPvP.prototype.isEnemy = function () {
        return true;
    };

    Game_EnemyPvP.prototype.friendsUnit = function () {
        return $gameTroop;
    };

    Game_EnemyPvP.prototype.opponentsUnit = function () {
        return $gameParty;
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.index = function () {
        return 0; // * PvP only 1 by 1
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.isBattleMember = function () {
        return true;
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.enemyId = function () {
        return Game_Actor.prototype.actorId.call(this);
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.enemy = function () {
        return Game_Actor.prototype.actor.call(this);
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.exp = function () {
        return 0; // * TODO: EXP
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.gold = function () {
        return 0; // * TODO: GOLD
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.makeDropItems = function () {
        return []; // * TODO: DROP ITEMS
    };

    Game_EnemyPvP.prototype.isSpriteVisible = function () {
        return true;
    };

    Game_EnemyPvP.prototype.screenX = function () {
        return Game_Enemy.prototype.screenX.call(this);
    };

    Game_EnemyPvP.prototype.screenY = function () {
        return Game_Enemy.prototype.screenY.call(this);
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.battlerHue = function () {
        return 0;
    };

    //$[OVER FROM GAME_ENEMY]
    Game_EnemyPvP.prototype.originalName = function () {
        return this.battlerName();
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.performActionStart = function (action) {
        Game_Enemy.prototype.performActionStart.call(this, action);
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.performDamage = function () {
        Game_Enemy.prototype.performDamage.call(this);
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.performCollapse = function () {
        Game_Battler.prototype.performCollapse.call(this);
        this.requestEffect('collapse');
        SoundManager.playEnemyCollapse();
    };

    //$[OVER GAME_ENEMY]
    Game_EnemyPvP.prototype.meetsCondition = function (action) {
        return false; // * In PvP Interpreter not working!
    };

    //$[OVER GAME_ACTOR]
    Game_EnemyPvP.prototype.makeActions = function () {
        Game_Battler.prototype.makeActions.call(this);
        this.makeAutoBattleActions(); //TODO: Auto Battle in TEST
    };

    //$[OVER GAME_ENEMY]
    Game_EnemyPvP.prototype.uniqueNetworkId = function () {
        return this.enemyId();
    };

    AlphaNET.register(Game_EnemyPvP);
})();
// ■ END Game_EnemyPvP.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////

(function () {

    //@[ALIAS]
    var _Game_Event_prototype_initMembers = Game_Event.prototype.initMembers;
    Game_Event.prototype.initMembers = function () {
        _Game_Event_prototype_initMembers.call(this);
        this._isOnlyLocalMovement = false;
        this._isNetworkSharedMode = false;
        this._isStartedFromNetwork = false;
        this._networkSyncCommands = [];
    };

    //@[ALIAS]
    var _alias_Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function () {
        _alias_Game_Event_initialize.call(this, ...arguments);
        this._checkNetworkGlobalSymbols();
    };

    //?[NEW]
    Game_Event.prototype.isLockedByNet = function () {
        return $gameMap.isEventLockedByNet(this.eventId());
    };

    //?[NEW]
    Game_Event.prototype._checkNetworkGlobalSymbols = function () {
        try {
            var ev = this.event();
            if (ev.note.contains('LOCAL')) {
                //"LOCAL".p(ev.id);
                this.setLocalMovementMode(true);
            }
            if (ev.note.contains('NET')) {
                if (Network.isMultiMode() == false) {
                    this.setLocalMovementMode(true);
                    this.setNetworkSharedMode(true);
                } else {
                    AlphaNET.warning(`using NET event (id ${this._eventId}) in multiplayer game mode on ${$gameMap.mapId()}`);
                }
            }
        } catch (error) {
            AlphaNET.error(error, ' read network global symbols from Event');
        }
    };

    //?[NEW]
    Game_Event.prototype.isOnlyLocalMoveMode = function () {
        return this._isOnlyLocalMovement == true;
    };

    //?[NEW]
    Game_Event.prototype.setLocalMovementMode = function (bool) {
        this._isOnlyLocalMovement = bool;
    };

    //?[NEW]
    Game_Event.prototype.setNetworkSharedMode = function (bool) {
        this._isNetworkSharedMode = bool;
    };

    //?[NEW]
    Game_Event.prototype.isNetworkSharedMode = function () {
        return (this._isNetworkSharedMode == true);
    };

    // * Когда Event движется, он передаёт все свои данные через сервер другим игрокам
    //@[ALIAS]
    var _Game_Event_prototype_moveStraight = Game_Event.prototype.moveStraight;
    Game_Event.prototype.moveStraight = function (d) {
        _Game_Event_prototype_moveStraight.call(this, d);
        if (Network.isConnected() && !this.isOnlyLocalMoveMode()) {
            var data = this._collectEventBasicDataForNetwork();
            data.moveData = this._collectDataForNetwork();
            Network.sendMessage(NetMessage.MapEventMoveData().setData(data));
        }
    };

    //?[NEW]
    Game_Event.prototype._collectEventBasicDataForNetwork = function () {
        var data = {
            eventId: this.eventId(),
            mapId: $gameMap.mapId()
        };
        return data;
    };

    // * Когда Event меняет Direction, он передаёт все свои данные через сервер другим игрокам
    //@[ALIAS]
    var _Game_Event_prototype_setDirection = Game_Event.prototype.setDirection;
    Game_Event.prototype.setDirection = function (d) {
        _Game_Event_prototype_setDirection.call(this, d);
        if (Network.isConnected() && !this.isOnlyLocalMoveMode()) {
            this._syncDirectionNetwork(d);
        }
    };

    //?[NEW]
    Game_Event.prototype._syncDirectionNetwork = function (d) {
        if (!this.isDirectionFixed() && d) {
            var data = this._collectEventBasicDataForNetwork();
            data.directionData = d;
            Network.sendMessage(NetMessage.MapEventMoveData().setData(data));
        }
    };

    //@[ALIAS]
    var _Game_Event_prototype_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
    Game_Event.prototype.updateSelfMovement = function () {
        if(Network.isConnected()) {
            this._updateSelfMovementForNetwork();
        } else {
            _Game_Event_prototype_updateSelfMovement.call(this);
        }
    };

    //?[NEW]
    Game_Event.prototype._updateSelfMovementForNetwork = function () {
        if(Network.isMultiMode()) {
            if ($gameMap.isEventOwnedByNet(this.eventId())) {
                //?EMPTY
                //* Если другой игрок заблокировал событие, то оно не обновляется в любом случае!
                return;
            }
            if(!Network.isMapOwner() && 
            !this.isOnlyLocalMoveMode()) {
                //?EMPTY
                //* Все движения событий обрабатываются на том клиенте, который первый попал на карту
            } else {
                _Game_Event_prototype_updateSelfMovement.call(this);
            }
        } else {
            if (!Network.isHost() &&
                !this.isOnlyLocalMoveMode()) {
                //?EMPTY
                //* Все движения событий обрабатываются на хосте, кроме только локальных
            } else {
                _Game_Event_prototype_updateSelfMovement.call(this);
            }
        }
    };

    // * Эта функция вызывается на Хосте, когда он находится не на сцене карты
    // * Она нужна, чтобы события продолжали SelfMovement и не зависали у всех игроков
    //?[NEW]
    Game_Event.prototype.updateForNetwork = function () {
        Game_Character.prototype.update.call(this);
    };

    //@[ALIAS]
    var _alias_Game_Event_list = Game_Event.prototype.list;
    Game_Event.prototype.list = function () {
        if (this.isNeedStartSyncCommand()) {
            "RUN EVENT SYNC COMMAND".p();
            return this._createSyncCommandsList();
        } else if (this.isLockedByNet()) {
            return [];
        } else
            return _alias_Game_Event_list.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias_Game_Event_update = Game_Event.prototype.update;
    Game_Event.prototype.update = function () {
        _alias_Game_Event_update.call(this, ...arguments);
        if (this.isNeedStartSyncCommand()) {
            this._starting = true;
        }
    };

    //?[NEW]
    Game_Event.prototype.startFromNetwork = function () {       
        this._isStartedFromNetwork = true;
        if (this.sharedPageIndex >= 0) {
            this._pageIndex = this.sharedPageIndex;
            this.sharedPageIndex = -1;
        }
        this.start();
    };

    //?[NEW]
    Game_Event.prototype.isStartedFromNetwork = function () {
        return this._isStartedFromNetwork == true;
    };

    //?[NEW]
    Game_Event.prototype.clearStartFromNetwork = function () {
        this._isStartedFromNetwork = false;
    };

    //@[ALIAS]
    var _alias_Game_Event_lock = Game_Event.prototype.lock;
    Game_Event.prototype.lock = function () {
        if (!this._locked) {
            this._setEventOwned(true);
        }
        _alias_Game_Event_lock.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias_Game_Event_unlock = Game_Event.prototype.unlock;
    Game_Event.prototype.unlock = function () {
        if (this._locked) {
            this._setEventOwned(false);
        }
        _alias_Game_Event_unlock.call(this, ...arguments);
    };
})();

// ■ END Game_Event.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Event_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Event.prototype;
  _.isNeedStartSyncCommand = function() {
    return this._networkSyncCommands.length > 0;
  };
  _.executeSyncCommandFromNetwork = function(pageIndex = 0, listIndex = -1) {
    this._networkSyncCommands.push([...arguments]);
    "COMMAND ADDED TO networkSyncCommands".p();
    if (!this.isStarting()) {
      return this._starting = true;
    }
  };
  _._createSyncCommandsList = function() {
    var list;
    list = this._networkSyncCommands.map((command) => {
      var item;
      item = this._getSyncCommand(...command);
      if (item != null) {
        return item;
      }
    });
    this._networkSyncCommands = [];
    return list;
  };
  _._getSyncCommand = function(pageIndex = 0, listIndex = -1) {
    var page;
    page = this.event().pages[pageIndex];
    if (page != null) {
      return this._getSyncCommandLine(page, listIndex);
    } else {
      return this._syncCommandLineNotFounded();
    }
  };
  _._getSyncCommandLine = function(page, index = -1) {
    var line, list;
    if (index < 0) {
      this._syncCommandLineNotFounded();
    }
    list = page.list;
    if (!((list != null) && list.length > 1)) {
      this._syncCommandLineNotFounded();
    }
    line = list[index];
    if (line != null) {
      return line;
    } else {
      return this._syncCommandLineNotFounded();
    }
  };
  _._syncCommandLineNotFounded = function() {
    AlphaNET.error('', 'Cannot Sync. Event Line not founded!');
    return null;
  };
  _._setEventOwned = function(isOwned) {
    var data;
    if (this._isEventNeedBeOwned()) {
      data = this._collectEventBasicDataForNetwork();
      data.isLock = isOwned;
      Network.sendMessage(NetMessage.OwnEvent().setData(data));
    }
  };
  _._isEventNeedBeOwned = function() {
    return Network.isConnected() && Network.isMultiMode() && !Network.isMapOwner();
  };
})();

// ■ END Game_Event_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Followers.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//$[OVER]
Game_Followers.prototype.initialize = function () {
    this._visible = true;
    this._gathering = false;
    this._data = [];
    for (var i = 0; i < Network.maximumNetworkPlayers; i++) {
        this._data.push(new AlphaNET.LIBS.NetworkCharacter(i));
    }
    this._netCharIdStore = null; // * Для оптимизации
};

//?[NEW]
Game_Followers.prototype.getNetworkCharById = function (id) {
    if (this._netCharIdStore == null)
        this._generateStore();
    return this._netCharIdStore[id];
};

// * Создаём хэш ID и character, чтобы каждый раз не искать по ID в _data
//?[NEW] 
Game_Followers.prototype._generateStore = function () {
    this._netCharIdStore = {};
    this._data.forEach(item => {
        this._netCharIdStore[item.netId] = item;
    });
};

//$[OVER]
Game_Followers.prototype.update = function () {
    this.forEach(function (follower) {
        follower.update();
    }, this);
};

//@[ALIAS]
/*var _alias_Game_Followers_updateMove = Game_Followers.prototype.updateMove;
Game_Followers.prototype.updateMove = function () {
    if(Network.isConnected()) {
        if (!Network.isHost()) return;
        for (var i = this._data.length - 1; i >= 0; i--) {
            var precedingCharacter = (i > 0 ? this._data[i - 1] : $gamePlayer);
            this._data[i].chaseCharacter(precedingCharacter);
        }
    } else
        _alias_Game_Followers_updateMove.call(this, ...arguments);
};*/ //TODO: Gather можно реализовать

//?[NEW]
Game_Followers.prototype.count = function () {
    return this._data.length;
};

//?[NEW]
Game_Followers.prototype.refreshNetwork = function () {
    this._data.forEach(item => item.refreshNet());
    this._generateStore();
};

//?[NEW]
Game_Followers.prototype.getNetworkPlayerOnPosition = function(x, y) {
    var networkPlayer = this._data.find(item => (item.x == x && item.y == y && item.actor()));
    return networkPlayer;
};
// ■ END Game_Followers.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

  // * 1 - сделать выполнение событий с Sync, only, except командами - OK
  //  Проверить если событие запущено другое, а приходит синхронизация - OK
  //  Проверить очередь - OK
  // * 2 - сделать NET ALL событие с Sync, only, except командами + регулировка одновременного старта - OK
  // * 3 - параллельные события ???
  // * 4 - indent, ветвление ???
  // * 5 - общие события (обыные, параллельные, автоматические) ???

  //@[DEFINES]
  var _ = Game_Interpreter.prototype;

  //@[ALIAS]
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'NET') {
      switch (args[0]) {
        /* jshint -W086 */
        case 'start':
          AlphaNET.startServer();
          // * Тут нет Break намеренно, так как сразу соединение нужно к серверу
        case 'connect':
          AlphaNET.connectToServer();
          break;
        case 'disconnect':
          AlphaNET.disconnectFromServer();
          break;
        case 'hotSeat':
          AlphaNET.startAnotherClient();
          break;
        case 'stop':
          AlphaNET.stopServer();
          break;
        case 'sync':
          this._onNETSyncCommand();
          break;
        case 'lock':
          this._onNETLockCommand();
          break;
        case 'only':
        case 'except':
          this._onNETConditionCommand(args);
          break;
        case 'virtual':
          this._onNETVirtualCommand();
          break;
        case 'restrict':
          if (Network.isHost())
            Network._allowConnection = false;
          break;
        case 'allow':
          if (Network.isHost())
            Network._allowConnection = true;
          break;
        default:
          break;
      }
    }
  };

  //@[ALIAS]
  var _alias_Game_Interpreter_clear = Game_Interpreter.prototype.clear;
  Game_Interpreter.prototype.clear = function () {
    _alias_Game_Interpreter_clear.call(this);
    this._network = new AlphaNET.LIBS.InterpreterNET();
  };

  //@[ALIAS]
  var _alias__setup = _.setup;
  _.setup = function () {
    _alias__setup.call(this, ...arguments);
    if (Network.isConnected() && this._eventId > 0) {
      this._network.setup(this._eventId, this._list);
      if (this._network.isShared() && this.isRunning()) {
        this._network.startNetwork();
      }
    }
  };

  //@[ALIAS]
  var _alias__updateWaitMode = _.updateWaitMode;
  _.updateWaitMode = function () {
    if (this._waitMode == 'network') {
      return this._updateWaitModeNetwork();
    } else 
      {
        this._network.resetWait();
        return _alias__updateWaitMode.call(this, ...arguments);
      }
  };

  //?[NEW]
  _._updateWaitModeNetwork = function () {
    if (!Network.isBusy()) {
      return this._network.updateWaitMode();
    }
    return true; // * Continue waiting
  };

  //@[ALIAS]
  var _alias__setupChoices = _.setupChoices;
  _.setupChoices = function () {
    _alias__setupChoices.call(this, ...arguments);
    if (Network.isConnected()) {
      $gameMessage.setSharedChoiseMode(this._network.isShared());
    }
  };

  // * Transfer Player
  //@[ALIAS]
  var _alias__command201 = _.command201;
  _.command201 = function () {
    return this._startCommandOnlyInSharedMode(_alias__command201, arguments);
  };


  // * Battle Processing
  //@[ALIAS]
  var _alias__command301 = _.command301;
  _.command301 = function () {
    return this._startCommandOnlyInSharedMode(_alias__command301, arguments);
  };

  //@[ALIAS]
  var _alias__terminate = _.terminate;
  _.terminate = function () {
    _alias__terminate.call(this, ...arguments);
    if (this._needEventUnlock) { // * Unlock the event
      this._onNETLockCommand(false);
    }
  };

  //?[NEW]
  _.command900 = function () {
    this.setWaitMode('network');
    return this._network.command900();
  };

  //?[NEW]
  _.command901 = function () {
    this.setWaitMode('network');
    return this._network.command901(this._index);
  };

  // * Change Party Member
  //@[ALIAS]
  var _alias__command129 = _.command129;
  _.command129 = function () {
    if (Network.isConnected()) {
      AlphaNET.warning('Change Party Member (129) - not allowed in Network game!');
      return true;
    } else
      return _alias__command129.call(this, ...arguments);
  };

  // * Getting On and Off Vehicles
  //@[ALIAS]
  var _alias__command206 = _.command206;
  _.command206 = function () {
    if (Network.isConnected()) {
      AlphaNET.warning('Getting On and Off Vehicles (206) - not allowed in Network game!');
      return true;
    } else
      return _alias__command206.call(this, ...arguments);
  };

  // * Change Player Followers
  //@[ALIAS]
  var _alias__command216 = _.command216;
  _.command216 = function () {
    if (Network.isConnected()) {
      AlphaNET.warning('Change Player Followers (216) - not allowed in Network game!');
      return true;
    } else
      return _alias__command216.call(this, ...arguments);
  };

  // * Gather Followers
  //$[OVER]
  _.command217 = function () {
    AlphaNET.warning('Gather Followers (217) - not working with Alpha NET plugin');
    return true;
  };

  //@[ALIAS]
  var _alias__executeCommand = _.executeCommand;
  _.executeCommand = function () {
    if (Network.isConnected())
      this._networkSynchronization();
    return _alias__executeCommand.call(this, ...arguments);
  };

})();

// ■ END LibGame_Interpreter
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//Compressed by MV Plugin Builder
(function(){var _0x47fc = [
    '_index',
    'SyncEvent',
    'setData',
    '_mapId',
    'OROqQ',
    'AwaeJ',
    'TiYYl',
    'mLRtc',
    'event',
    '_pageIndex',
    'kQFFi',
    '_onNETLockCommand',
    'EdyPa',
    'jEyvk',
    '_needEventUnlock',
    'isLock',
    'LockEvent',
    '_onNETConditionCommand',
    'isConnected',
    'orIaT',
    'get\x20page\x20index\x20for\x20event\x20sync\x20command',
    'split',
    'map',
    'AJeUw',
    'eventId',
    'cUbDB',
    'ZrsHH',
    'while\x20read\x20condition\x20excpet\x20or\x20only',
    '_executeConditionCommand',
    'tupRk',
    'isHost',
    'getMyPlayerIndex',
    'getMyActorId',
    'contains',
    'except',
    'vfOGz',
    'KsEPn',
    'call',
    '_isListLineIsSynced',
    'code',
    'YjaQQ',
    'parameters',
    'NET\x20sync',
    'ycPio',
    'xUZbM',
    'only',
    '_startCommandOnlyInSharedMode',
    'HiwAr',
    '_sendVirtualCommand',
    'isMultiMode',
    '_executeVirtualCommand',
    'lsEWI',
    'tQoas',
    'isShared',
    '_isSyncCommandRequire',
    'warning',
    'This\x20command\x20allowed\x20only\x20in\x20NET\x20shared\x20events',
    '_networkSynchronization',
    'BuaDP',
    '_network',
    'itywA',
    'GiqMt',
    'sendMessage',
    'currentCommand',
    'yMxLv',
    'VirtualInterpreter',
    'CreateSubMessageData',
    '_eventId',
    'eUjjc',
    'UzpgN',
    'yxMoS',
    '_list',
    'prototype',
    '_onNETSyncCommand',
    '_isSyncCommandValid',
    '_executeSyncCommand',
    'nextEventCode',
    'include',
    'qgqTH',
    'KwHhk',
    'error',
    '_getBasicEventDataForNet',
    '_getCurrentPageIndexForNet'
];
(function (_0x5d4f0e, _0x4176dc) {
    var _0x457342 = function (_0x89c927) {
        while (--_0x89c927) {
            _0x5d4f0e['push'](_0x5d4f0e['shift']());
        }
    };
    _0x457342(++_0x4176dc);
}(_0x47fc, 0x9b));
var _0x3350 = function (_0x41bdc0, _0x3b9b28) {
    _0x41bdc0 = _0x41bdc0 - 0x0;
    var _0x2f8a0c = _0x47fc[_0x41bdc0];
    return _0x2f8a0c;
};
(function () {
    var _0x43d4e3, _0x5dcb7d, _0x13692d;
    _0x13692d = Game_Interpreter[_0x3350('0x0')];
    _0x5dcb7d = [
        0x65,
        0x66,
        0x67,
        0x68,
        0x6c
    ];
    _0x43d4e3 = [
        0x137,
        0x138,
        0x146,
        0x139,
        0x13a,
        0x13b,
        0x13c,
        0x13d,
        0x13e,
        0x13f,
        0x140,
        0x141,
        0x142,
        0x143,
        0x144,
        0x145,
        0xca,
        0xcb,
        0x119,
        0x11a,
        0x11b,
        0x11c,
        0x14b,
        0x14c,
        0x156,
        0x14d,
        0x14e,
        0x14f,
        0x150,
        0x151,
        0x153,
        0x154
    ];
    _0x13692d[_0x3350('0x1')] = function () {
        if (!Network['isConnected']()) {
            return;
        }
        if (this[_0x3350('0x2')]()) {
            return this[_0x3350('0x3')]();
        }
    };
    _0x13692d['_isSyncCommandValid'] = function () {
        var _0x10a7db;
        _0x10a7db = this[_0x3350('0x4')]();
        return !_0x5dcb7d[_0x3350('0x5')](_0x10a7db) && !_0x43d4e3[_0x3350('0x5')](_0x10a7db);
    };
    _0x13692d[_0x3350('0x3')] = function () {
        if (_0x3350('0x6') === _0x3350('0x7')) {
            e = error;
            AlphaNET[_0x3350('0x8')](e, 'while\x20check\x20list[index]\x20to\x20sync\x20line');
        } else {
            var _0x26e997;
            _0x26e997 = this[_0x3350('0x9')]();
            _0x26e997['pi'] = this[_0x3350('0xa')]();
            _0x26e997['li'] = this[_0x3350('0xb')] + 0x1;
            return Network['sendMessage'](NetMessage[_0x3350('0xc')]()[_0x3350('0xd')](_0x26e997));
        }
    };
    _0x13692d[_0x3350('0x9')] = function () {
        return {
            'mapId': this[_0x3350('0xe')],
            'eventId': this['eventId']()
        };
    };
    _0x13692d[_0x3350('0xa')] = function () {
        var _0x4efabb, _0x6ac072, _0x2d60a6;
        try {
            if (_0x3350('0xf') !== _0x3350('0x10')) {
                _0x6ac072 = this['eventId']();
                if (_0x6ac072) {
                    if (_0x3350('0x11') === _0x3350('0x12')) {
                        return Number(item);
                    } else {
                        _0x2d60a6 = $gameMap[_0x3350('0x13')](_0x6ac072);
                        if (_0x2d60a6) {
                            return _0x2d60a6[_0x3350('0x14')];
                        }
                    }
                }
                return 0x0;
            } else {
                return _0x43d4e3[_0x3350('0x5')](code);
            }
        } catch (_0x35a132) {
            if (_0x3350('0x15') !== _0x3350('0x15')) {
                return;
            } else {
                _0x4efabb = _0x35a132;
                AlphaNET['error'](_0x4efabb, 'get\x20page\x20index\x20for\x20event\x20sync\x20command');
                return 0x0;
            }
        }
    };
    _0x13692d[_0x3350('0x16')] = function (_0x26d84d = !![]) {
        if (_0x3350('0x17') !== _0x3350('0x18')) {
            var _0x42c1fb;
            if (!Network['isConnected']()) {
                return;
            }
            this[_0x3350('0x19')] = _0x26d84d;
            _0x42c1fb = this[_0x3350('0x9')]();
            _0x42c1fb[_0x3350('0x1a')] = _0x26d84d;
            return Network['sendMessage'](NetMessage[_0x3350('0x1b')]()['setData'](_0x42c1fb));
        } else {
            var _0x3cdce7;
            _0x3cdce7 = this[_0x3350('0x4')]();
            return !_0x5dcb7d[_0x3350('0x5')](_0x3cdce7) && !_0x43d4e3[_0x3350('0x5')](_0x3cdce7);
        }
    };
    _0x13692d[_0x3350('0x1c')] = function (_0x108f19) {
        var _0x17c2ee, _0x3ec4a6, _0x48bab2;
        try {
            if (!Network[_0x3350('0x1d')]()) {
                if (_0x3350('0x1e') !== _0x3350('0x1e')) {
                    this[_0x3350('0xb')]++;
                } else {
                    return;
                }
            }
            _0x3ec4a6 = _0x108f19[0x1];
            if (_0x3ec4a6 == null) {
                if ('SXZmY' !== 'PAYkY') {
                    this['_executeConditionCommand'](_0x108f19[0x0]);
                } else {
                    _0x17c2ee = error;
                    AlphaNET['error'](_0x17c2ee, _0x3350('0x1f'));
                    return 0x0;
                }
            } else {
                _0x48bab2 = _0x108f19[0x1][_0x3350('0x20')]('|')[_0x3350('0x21')](function (_0x466917) {
                    if ('AJeUw' !== _0x3350('0x22')) {
                        return {
                            'mapId': this[_0x3350('0xe')],
                            'eventId': this[_0x3350('0x23')]()
                        };
                    } else {
                        return Number(_0x466917);
                    }
                });
                this['_executeConditionCommand'](_0x108f19[0x0], _0x48bab2, _0x108f19[0x2] === 'A');
            }
        } catch (_0x5ac60d) {
            if (_0x3350('0x24') !== _0x3350('0x25')) {
                _0x17c2ee = _0x5ac60d;
                AlphaNET['error'](_0x17c2ee, _0x3350('0x26'));
            } else {
                return;
            }
        }
    };
    _0x13692d[_0x3350('0x27')] = function (_0x144f7f, _0x285fe7 = null, _0x2774ab = ![]) {
        if (_0x3350('0x28') === _0x3350('0x28')) {
            var _0x549682, _0x4a6955;
            _0x549682 = Network[_0x3350('0x29')]();
            if (_0x285fe7 != null) {
                _0x4a6955 = !_0x2774ab ? NetPartyManager[_0x3350('0x2a')]() : NetPartyManager[_0x3350('0x2b')]();
                _0x549682 = _0x285fe7[_0x3350('0x2c')](_0x4a6955);
            }
            if (_0x549682 && _0x144f7f === _0x3350('0x2d')) {
                if (_0x3350('0x2e') !== _0x3350('0x2f')) {
                    this[_0x3350('0xb')]++;
                } else {
                    return method[_0x3350('0x30')](this, ...args);
                }
            }
            if (!_0x549682 && _0x144f7f === 'only') {
                this[_0x3350('0xb')]++;
            }
        } else {
            return method['call'](this, ...args);
        }
    };
    _0x13692d[_0x3350('0x31')] = function (_0x981206) {
        var _0x5bd179, _0x2c5def;
        try {
            _0x5bd179 = this['_list'][_0x981206];
            if (_0x5bd179[_0x3350('0x32')] === 0x164) {
                if (_0x3350('0x33') !== _0x3350('0x33')) {
                    return method[_0x3350('0x30')](this, ...args);
                } else {
                    return _0x5bd179[_0x3350('0x34')][0x0] === _0x3350('0x35');
                }
            }
        } catch (_0x2b22ad) {
            if (_0x3350('0x36') !== _0x3350('0x37')) {
                _0x2c5def = _0x2b22ad;
                AlphaNET[_0x3350('0x8')](_0x2c5def, 'while\x20check\x20list[index]\x20to\x20sync\x20line');
            } else {
                var _0x6e8f68, _0x220e09;
                _0x6e8f68 = Network[_0x3350('0x29')]();
                if (id != null) {
                    _0x220e09 = !isActorId ? NetPartyManager[_0x3350('0x2a')]() : NetPartyManager[_0x3350('0x2b')]();
                    _0x6e8f68 = id[_0x3350('0x2c')](_0x220e09);
                }
                if (_0x6e8f68 && command === _0x3350('0x2d')) {
                    this[_0x3350('0xb')]++;
                }
                if (!_0x6e8f68 && command === _0x3350('0x38')) {
                    this[_0x3350('0xb')]++;
                }
            }
        }
        return ![];
    };
    _0x13692d[_0x3350('0x39')] = function (_0x1a5c81, _0x4b59e8) {
        if (_0x3350('0x3a') !== _0x3350('0x3a')) {
            var _0x3dd9df;
            _0x3dd9df = this['_list'][this[_0x3350('0xb')] + 0x1];
            return this[_0x3350('0x3b')](_0x3dd9df);
        } else {
            if (!Network[_0x3350('0x1d')]()) {
                return _0x1a5c81[_0x3350('0x30')](this, ..._0x4b59e8);
            } else {
                if (Network[_0x3350('0x3c')]()) {
                    if ('FOazd' !== 'DhSxN') {
                        return _0x1a5c81['call'](this, ..._0x4b59e8);
                    } else {
                        return this[_0x3350('0x3d')]();
                    }
                } else {
                    if (this['_network']['isShared']()) {
                        if (_0x3350('0x3e') !== _0x3350('0x3f')) {
                            return _0x1a5c81[_0x3350('0x30')](this, ..._0x4b59e8);
                        } else {
                            var _0x435a91;
                            if (this['_network'][_0x3350('0x40')]()) {
                                return;
                            }
                            _0x435a91 = this['currentCommand']();
                            if (_0x435a91 == null) {
                                return;
                            }
                            if (!this[_0x3350('0x41')](_0x435a91[_0x3350('0x32')])) {
                                return;
                            }
                            return this[_0x3350('0x3b')](_0x435a91);
                        }
                    } else {
                        AlphaNET[_0x3350('0x42')](_0x3350('0x43'));
                    }
                }
            }
            return !![];
        }
    };
    _0x13692d[_0x3350('0x44')] = function () {
        if (_0x3350('0x45') !== _0x3350('0x45')) {
            AlphaNET[_0x3350('0x42')]('This\x20command\x20allowed\x20only\x20in\x20NET\x20shared\x20events');
        } else {
            var _0xe20a7e;
            if (this[_0x3350('0x46')]['isShared']()) {
                if (_0x3350('0x47') === _0x3350('0x48')) {
                    var _0x268ac7;
                    if (!Network['isConnected']()) {
                        return;
                    }
                    this[_0x3350('0x19')] = isLock;
                    _0x268ac7 = this[_0x3350('0x9')]();
                    _0x268ac7['isLock'] = isLock;
                    return Network[_0x3350('0x49')](NetMessage['LockEvent']()[_0x3350('0xd')](_0x268ac7));
                } else {
                    return;
                }
            }
            _0xe20a7e = this[_0x3350('0x4a')]();
            if (_0xe20a7e == null) {
                return;
            }
            if (!this[_0x3350('0x41')](_0xe20a7e[_0x3350('0x32')])) {
                return;
            }
            return this[_0x3350('0x3b')](_0xe20a7e);
        }
    };
    _0x13692d[_0x3350('0x41')] = function (_0x5e1089) {
        return _0x43d4e3[_0x3350('0x5')](_0x5e1089);
    };
    _0x13692d[_0x3350('0x3b')] = function (_0x29e810) {
        if (_0x3350('0x4b') !== 'yMxLv') {
            return;
        } else {
            var _0x20a597, _0x1ce7a9;
            _0x1ce7a9 = NetMessage[_0x3350('0x4c')]();
            _0x20a597 = NetMessage[_0x3350('0x4d')](_0x29e810[_0x3350('0x32')]);
            _0x20a597[_0x3350('0x34')] = _0x29e810[_0x3350('0x34')];
            _0x20a597['mapId'] = this['_mapId'];
            _0x20a597[_0x3350('0x23')] = this[_0x3350('0x4e')];
            _0x1ce7a9[_0x3350('0xd')](_0x20a597);
            Network['sendMessage'](_0x1ce7a9);
        }
    };
    _0x13692d['_onNETVirtualCommand'] = function () {
        if (!Network[_0x3350('0x1d')]()) {
            if (_0x3350('0x4f') !== _0x3350('0x50')) {
                return;
            } else {
                if (this['_network'][_0x3350('0x40')]()) {
                    return method['call'](this, ...args);
                } else {
                    AlphaNET[_0x3350('0x42')](_0x3350('0x43'));
                }
            }
        }
        if (this[_0x3350('0x46')][_0x3350('0x40')]()) {
            return;
        }
        if (this[_0x3350('0x2')]()) {
            return this[_0x3350('0x3d')]();
        }
    };
    _0x13692d[_0x3350('0x3d')] = function () {
        if (_0x3350('0x51') === 'AVGGZ') {
            return;
        } else {
            var _0x2baded;
            _0x2baded = this[_0x3350('0x52')][this[_0x3350('0xb')] + 0x1];
            return this['_sendVirtualCommand'](_0x2baded);
        }
    };
}());
})();

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //?[NEW]
    Game_Map.prototype.updateEventsForNetwork = function () {
        this.events().forEach(function (event) {
            event.updateForNetwork();
        });
        //TODO: Можно просто вызывать updateEvents
        //TODO: Сейчас в этой функции не обновляются commonEvents
    };


    //@[ALIAS]
    var _alias_Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function () {
        _alias_Game_Map_update.call(this, ...arguments);
        this._checkSharedEvent();
    };

    //?[NEW]
    Game_Map.prototype._checkSharedEvent = function () {
        if (this._sharedEventData != null) {
            this._sharedEventData.startFromNetwork();
            this._sharedEventData = null;
        }
    };

    //@[ALIAS]
    var _alias_Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function () {
        //console.groupCollapsed('Game_Map_setup');
        _alias_Game_Map_setup.call(this, ...arguments);
        this._sharedEventData = null;
        this._lockedEventsIds = [];
        this._ownedEventIds = [];
        this._isNeedRefreshSpritesForNetwork = false;
        ///console.groupEnd();
    };

    //?[NEW]
    Game_Map.prototype.startEventFromNetwork = function (data) {
        if (data.mapId == this.mapId()) {
            var event = this.event(data.eventId);
            if (event && !$gameMap.isAnyEventStarting()) {
                "DATA PAGE INDEX".p(data.pageIndex);
                event.sharedPageIndex = data.pageIndex;
                this._sharedEventData = event;
            }
        }
    };

    //?[NEW]
    Game_Map.prototype.setLockedEventByNetwork = function (eventId, isLocked = true) {
        if (!eventId || eventId <= 0) return;
        if (!this.event(eventId)) return;
        if (isLocked) {
            "GAME MAP LOCK EVENT".p(eventId);
            this._lockedEventsIds.push(eventId);
        } else {
            "  GAME MAP UNLOCK EVENT".p(eventId);
            this._lockedEventsIds.delete(eventId);
        }
    };

    //?[NEW]
    Game_Map.prototype.isEventLockedByNet = function (eventId) {
        if(this._lockedEventsIds != null)
            return this._lockedEventsIds.includes(eventId);
        return false;
    };

})();
// ■ END Game_Map.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //?[NEW]
    // * Собирает информацию о позициях всех глобальных событий
    Game_Map.prototype.collectDataForNetwork = function () {
        try {
            var eventsForNet = this._getLocalOnlyEvents();
            var dataForNet = [];
            var data;
            eventsForNet.forEach(event => {
                data = event.collectDataForNetwork();
                data.eventId = event.eventId();
                dataForNet.push(data);
            });
            return dataForNet;
        } catch (error) {
            AlphaNET.error(error, ' while try collect event moving data for Network');
            return [];
        }
    };

    //?[NEW]
    // * Обновляет позицию для всех глобальных событий
    Game_Map.prototype.synchronizeFromNetwork = function (netMapData) {
        if (netMapData == null || netMapData.length == 0)
            return;
        var event;
        netMapData.forEach(data => {
            event = this.event(data.eventId);
            if (event != null) {
                if (!event.isOnlyLocalMoveMode()) {
                    event.synchronizeFromNetwork(data);
                }
            }
        });
    };

    //?[NEW]
    Game_Map.prototype.setOwnedEventByNetwork = function (eventId, isOwned = true) {
        if (!eventId || eventId <= 0) return;
        if (!this.event(eventId)) return;
        if (isOwned) {
            "GAME MAP OWNED EVENT".p(eventId);
            this._ownedEventIds.push(eventId);
        } else {
            "  GAME MAP OWNED EVENT".p(eventId);
            this._ownedEventIds.delete(eventId);
        }
    };

    //?[NEW]
    Game_Map.prototype.isEventOwnedByNet = function (eventId) {
        if (this._ownedEventIds != null)
            return this._ownedEventIds.includes(eventId);
        return false;
    };

    //?[NEW]
    Game_Map.prototype.isSpritesRefreshRequestedForNetwork = function () {
        return this._isNeedRefreshSpritesForNetwork;
    };

    //?[NEW]
    Game_Map.prototype.spritesRefreshForNetworkComplete = function () {
        this._isNeedRefreshSpritesForNetwork = false;
    };

    //?[NEW]
    Game_Map.prototype.requestNetworkRefresh = function () {
        this._isNeedRefreshSpritesForNetwork = true;
    };
})();
// ■ END Game_Map_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[CLASS IMPL ONLY]

  //@[DEFINES]
  _ = Game_Map.prototype;
  _._getLocalOnlyEvents = function() {
    return this.events().filter(function(event) {
      return !event.isOnlyLocalMoveMode();
    });
  };
})();

// ■ END Game_Map_private.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Message.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Game_Message_clear6565 = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function () {
        _alias_Game_Message_clear6565.call(this, ...arguments);
        this._isChoiseShared = false;
    };

    //?[NEW]
    Game_Message.prototype.setSharedChoiseMode = function (bool) {
        this._isChoiseShared = bool;
    };

    //?[NEW]
    Game_Message.prototype.isChoiseSharedMode = function () {
        return (this._isChoiseShared == true);
    };
})();
// ■ END Game_Message.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //?[NEW]
    Game_Party.prototype.isMaximumForNetwork = function () {
        return Network.maximumNetworkPlayers == this.size();
    };

    //@[ALIAS]
    var _alias_Game_Party_leader = Game_Party.prototype.leader;
    Game_Party.prototype.leader = function () {
        if (Network.isConnected() && !Network.isHost()) {
            return this._networkLeader();
        } else {
            return _alias_Game_Party_leader.call(this);
        }
    };

    //?[NEW]
    Game_Party.prototype._networkLeader = function () {
        if (Network.myPlayerData != null && Network.myPlayerData.actorId != null)
            return this.memberByActorId(Network.myPlayerData.actorId);
        else
            return this.members()[0];
    };

    //@[ALIAS]
    var _alias_Game_Party_battleMembers = Game_Party.prototype.battleMembers;
    Game_Party.prototype.battleMembers = function () {
        if (Network.isConnected() && Network.isMultiMode()) {
            return this._networkBattleMembers();
        } else
            return _alias_Game_Party_battleMembers.call(this, ...arguments);
    };

    //?[NEW]
    Game_Party.prototype._networkBattleMembers = function () {
        return [this._networkLeader()];
    };

    //?[NEW]
    Game_Party.prototype.memberByActorId = function (actorId) {
        return $gameActors.actor(actorId);
    };

    //?[NEW]
    Game_Party.prototype.memberIndexByActorId = function (actorId) {
        return this.members().findElementIndexByField("_actorId", actorId);
    };

    //?[NEW]
    Game_Party.prototype.refreshForNetwork = function () {
        if(Network.isConnected())
            this.members().forEach(item => item.refresh());
    };

    //?[NEW]
    Game_Party.prototype.getDataForNetwork = function () {
        var itemsData = {
            items: JSON.stringify($gameParty._items),
            weapons: JSON.stringify($gameParty._weapons),
            armors: JSON.stringify($gameParty._armors),
            gold: JSON.stringify($gameParty._gold)
        };
        return itemsData;
    };

    //?[NEW]
    Game_Party.prototype.setDataFromNetwork = function (data) {
        if(data.items != null) {
            $gameParty._items = JSON.parse(data.items);
        }
        if (data.weapons != null) {
            $gameParty._weapons = JSON.parse(data.weapons);
        }
        if (data.gold != null) {
            $gameParty._gold = JSON.parse(data.gold);
        }
        if (data.armors != null)
            this._setArmorsFromNetwork(data.armors);
    };

    // * Отдельный метод для совместимости с YEP плагином
    //?[NEW]
    Game_Party.prototype._setArmorsFromNetwork = function (armors) {
        if (armors != null) {
            $gameParty._armors = JSON.parse(armors);
        }
    };

})();
// ■ END Game_Party.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _Game_Player_prototype_moveStraight = Game_Player.prototype.moveStraight;
    Game_Player.prototype.moveStraight = function (d) {
        _Game_Player_prototype_moveStraight.call(this, d);
        if (Network.isConnected()) {
            var moveData = this._collectDataForNetwork();
            Network.sendMessage(NetMessage.PlayerMoveData().setData(moveData));
        }
    };

    //@[ALIAS]
    var _alias_Game_Player_getOnOffVehicle = Game_Player.prototype.getOnOffVehicle;
    Game_Player.prototype.getOnOffVehicle = function () {
        if (Network.isConnected()) {
            return false;
        } else
            return _alias_Game_Player_getOnOffVehicle.call(this, ...arguments);
    };

    //?[BASE]
    Game_Player.prototype.getNetworkName = function () {
        if (AlphaNET.Parameters.get_ShowNameplatesMode() > 1)
            return $gameParty.leader().name();
    };

    //?[BASE]
    Game_Player.prototype.getNetworkNameStyleId = function () {
        return $gameParty.leader().networkStyleId();
    };

    //@[ALIAS]
    var _alias_Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
    Game_Player.prototype.checkEventTriggerThere = function () {

        _alias_Game_Player_checkEventTriggerThere.call(this, ...arguments);
        if (Network.isConnected() && Network.isMultiMode()) {
            this._checkPvPStartTrigger();
        }
    };

    //?[NEW]
    Game_Player.prototype._checkPvPStartTrigger = function () {
        if (this.canStartLocalEvents() && !$gameMap.isAnyEventStarting()) {
            var direction = this.direction();
            var x = $gameMap.roundXWithDirection(this.x, direction);
            var y = $gameMap.roundYWithDirection(this.y, direction);
            var netPlayer = this.followers().getNetworkPlayerOnPosition(x, y);
            if(netPlayer) {
                "FINDED PLAYER FOR PVP ".p(netPlayer.netIndex);
                var d2 = netPlayer.direction();
                var canStartPvp = false;
                switch (direction) {
                    case 2:
                        canStartPvp = (d2 == 8);
                        break;
                    case 8:
                        canStartPvp = (d2 == 2);
                        break;
                    case 4:
                        canStartPvp = (d2 == 6);
                        break;
                    case 6:
                        canStartPvp = (d2 == 4);
                        break;
                    default:
                        break;
                }
                if(canStartPvp == true) {
                    if (netPlayer.networkIconId() <= 0) {
                        Network.requestPvPBattle(netPlayer.netIndex);
                        return true;
                    }
                    else {
                        "CHAR IS BUSY!".p();
                    }
                }
                else
                    "WRONG DIRECTION".p();
            }
        }
        return false;
    };

})();
// ■ END Game_Player.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Troop.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function () {
        _alias_Game_Troop_setup.call(this, ...arguments);
        this._isPvPTroop = false;
        if (BattleManager.isNetworkBattle()) {
            if (this._uniqueNamesFromNetwork != null) {
                this.setUniqueIdsForEnemies(this._uniqueNamesFromNetwork);
            }
        }
    };

    //?[NEW]
    Game_Troop.prototype.getEnemyByNetId = function (netId) {
        return this.members().find(item => item.uniqueNetworkId() == netId);
    };

    //?[NEW]
    Game_Troop.prototype.setUniqueIdsForEnemies = function (data) {
        var enemies = this.members();
        if (enemies.length > 0) {
            data.forEach((item, index) => enemies[index]._uniqueNetworkId = item);
            this._uniqueNamesFromNetwork = null;
        } else {
            this._uniqueNamesFromNetwork = data;
        }
    };

    //?[NEW]
    Game_Troop.prototype.setupPvPBattle = function (enemyActorId) {
        this.clear();
        this._troopId = 0;
        this._enemies = [];
        var x = 408;
        var y = 436;
        var actorId = enemyActorId;
        var enemy = new AlphaNET.LIBS.Game_EnemyPvP(actorId, x, y);
        this._enemies.push(enemy);
        this._isPvPTroop = true;
    };

    //?[NEW]
    Game_Troop.prototype.isPvPTroop = function () {
        return this._isPvPTroop == true;
    };

    //?[NEW]
    Game_Troop.prototype.rival = function () {
        return this.members()[0];
    };

    //@[ALIAS]
    var _alias_Game_Troop_setupBattleEvent = Game_Troop.prototype.setupBattleEvent;
    Game_Troop.prototype.setupBattleEvent = function () {
        if (this.isPvPTroop() == true) {

        } else 
            _alias_Game_Troop_setupBattleEvent.call(this, ...arguments);    
    };

    //@[ALIAS]
    var _alias_Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
    Game_Troop.prototype.increaseTurn = function () {
        if (this.isPvPTroop() == true) {
            this._turnCount++;
        } else
            _alias_Game_Troop_increaseTurn.call(this, ...arguments);
    };
})();
// ■ END Game_Troop.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ HotSeatKeyMapper.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[CLASS IMPL ONLY]

    // * inputType: 1 - Mouse, 2 - Keyboard, null - All
    HotSeatKeyMapper.init = function (inputType, mirror) {
        if (!Utils.isNwjs())
            return;

        this._inputType = inputType;
        this._mirror = mirror; // * Другой маппер
        this._initMapper();
    };

    if (!Utils.isNwjs())
        return;

    Input._setupEventHandlers = function () {
        window.addEventListener('blur', this._onLostFocus.bind(this));
    };

    TouchInput._setupEventHandlers = function () {
        var isSupportPassive = Utils.isSupportPassiveEvent();
        document.addEventListener('mousemove', this._onMouseMove.bind(this));
        document.addEventListener('wheel', this._onWheel.bind(this));
        document.addEventListener('touchstart', this._onTouchStart.bind(this), isSupportPassive ? {
            passive: false
        } : false);
        document.addEventListener('touchmove', this._onTouchMove.bind(this), isSupportPassive ? {
            passive: false
        } : false);
        document.addEventListener('touchend', this._onTouchEnd.bind(this));
        document.addEventListener('touchcancel', this._onTouchCancel.bind(this));
        document.addEventListener('pointerdown', this._onPointerDown.bind(this));
    };

    HotSeatKeyMapper._initMapper = function () {
        document.addEventListener('mousedown', this._onMouseDown.bind(this));
        document.addEventListener('mouseup', this._onMouseUp.bind(this));
        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keyup', this._onKeyUp.bind(this));
    };

    HotSeatKeyMapper._onMouseDown = function (eventX) {
        var data = {
            type: 1,
            name: '_onMouseDown',
            event: eventX
        };
        this.map(data);
    };

    HotSeatKeyMapper.map = function (data) {
        if (data.type == 1) {
            this.touchMap(data);
        } else {
            this.keyMap(data);
        }
    };

    HotSeatKeyMapper.touchMap = function (data) {
        if (this.isMouse()) {
            executeFunctionByName(data.name, TouchInput, data.event);
        } else {
            this.sendToMirror(data);
        }
    };

    HotSeatKeyMapper.sendToMirror = function (data) {
        if (this._mirror) {
            this._mirror.map(data);
        }
    };

    HotSeatKeyMapper.keyMap = function (data) {
        if (this.isKeyboard()) {
            executeFunctionByName(data.name, Input, data.event);
        } else {
            this.sendToMirror(data);
        }
    };

    HotSeatKeyMapper._onMouseMove = function (eventX) {
        var data = {
            type: 1,
            name: '_onMouseMove',
            event: eventX
        }
        this.map(data);
    };

    HotSeatKeyMapper._onMouseUp = function (eventX) {
        var data = {
            type: 1,
            name: '_onMouseUp',
            event: eventX
        };
        this.map(data);
    };

    //В event.type записано название типа события
    HotSeatKeyMapper._onKeyDown = function (eventX) {
        var data = {
            type: 2,
            name: '_onKeyDown',
            event: eventX
        };
        this.map(data);
    };

    HotSeatKeyMapper._onKeyUp = function (eventX) {
        var data = {
            type: 2,
            name: '_onKeyUp',
            event: eventX
        };
        this.map(data);
    };

    HotSeatKeyMapper.isKeyboard = function () {
        if (this._inputType == null)
            return true;
        return this._inputType == 2;
    };

    HotSeatKeyMapper.isMouse = function () {
        if (this._inputType == null)
            return true;
        return this._inputType == 1;
    };

    HotSeatKeyMapper.myType = function () {
        return this._inputType;
    };

    HotSeatKeyMapper.isMyType = function (data) {
        if (this.myType() == null)
            return true;
        return this.myType() == data.type;
    };
})();
// ■ END HotSeatKeyMapper.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Image_Manager_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){

    //?[NEW]
    ImageManager.loadNetwork = function (filename, hue) {
        return this.loadBitmap('img/network/', filename, hue, false);
    };
    
})();
// ■ END Image_Manager_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//Compressed by MV Plugin Builder
(function(){var _0x407d = [
    '_width',
    'textAlign',
    'left',
    '1px\x201px\x203px\x20#000',
    'style',
    'fontSize',
    '400px',
    'position',
    'absolute',
    '<font\x20color=\x22white\x22>',
    '</font><br>',
    'innerHTML',
    'WHumk',
    '_createErrorPrinter',
    'call',
    'create',
    'createElement',
    '_infoPrinter',
    'InfoPrinter',
    'setup',
    'body',
    'appendChild',
    'width'
];
(function (_0x3a929b, _0x511655) {
    var _0x22c4e0 = function (_0x5e1387) {
        while (--_0x5e1387) {
            _0x3a929b['push'](_0x3a929b['shift']());
        }
    };
    _0x22c4e0(++_0x511655);
}(_0x407d, 0xdc));
var _0x1d44 = function (_0x5dbb32, _0x6b81a6) {
    _0x5dbb32 = _0x5dbb32 - 0x0;
    var _0x48fbbd = _0x407d[_0x5dbb32];
    return _0x48fbbd;
};
(function () {
    var _0x1b3f0d;
    _0x1b3f0d = Graphics[_0x1d44('0x0')];
    Graphics['_createErrorPrinter'] = function () {
        _0x1b3f0d[_0x1d44('0x1')](this);
        return InfoPrinter[_0x1d44('0x2')]();
    };
    InfoPrinter['create'] = function () {
        InfoPrinter['_infoPrinter'] = document[_0x1d44('0x3')]('p');
        InfoPrinter[_0x1d44('0x4')]['id'] = _0x1d44('0x5');
        InfoPrinter[_0x1d44('0x6')]();
        return document[_0x1d44('0x7')][_0x1d44('0x8')](InfoPrinter['_infoPrinter']);
    };
    InfoPrinter[_0x1d44('0x6')] = function () {
        var _0x23f872;
        _0x23f872 = InfoPrinter[_0x1d44('0x4')];
        _0x23f872[_0x1d44('0x9')] = Graphics[_0x1d44('0xa')] * 0.8;
        _0x23f872['height'] = 0x64;
        _0x23f872['style'][_0x1d44('0xb')] = _0x1d44('0xc');
        _0x23f872['style']['textShadow'] = _0x1d44('0xd');
        _0x23f872[_0x1d44('0xe')][_0x1d44('0xf')] = '20px';
        _0x23f872[_0x1d44('0xe')]['zIndex'] = 0x46;
        _0x23f872['style'][_0x1d44('0x9')] = _0x1d44('0x10');
        _0x23f872[_0x1d44('0xe')]['height'] = _0x1d44('0x10');
        return _0x23f872[_0x1d44('0xe')][_0x1d44('0x11')] = _0x1d44('0x12');
    };
    InfoPrinter['p'] = function (_0x2f9cba) {
        var _0x1db91e;
        if (InfoPrinter[_0x1d44('0x4')] == null) {
            return;
        }
        _0x1db91e = _0x1d44('0x13') + _0x2f9cba + _0x1d44('0x14');
        InfoPrinter[_0x1d44('0x4')][_0x1d44('0x15')] = _0x1db91e;
    };
    InfoPrinter['clear'] = function () {
        if (InfoPrinter[_0x1d44('0x4')] == null) {
            if ('WHumk' === _0x1d44('0x16')) {
                return;
            } else {
                var _0x5e7049;
                if (InfoPrinter['_infoPrinter'] == null) {
                    return;
                }
                _0x5e7049 = _0x1d44('0x13') + text + _0x1d44('0x14');
                InfoPrinter[_0x1d44('0x4')][_0x1d44('0x15')] = _0x5e7049;
            }
        }
        InfoPrinter['_infoPrinter'][_0x1d44('0x15')] = '';
    };
}());
})();

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Input.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    ///INPUT
    var i, j;
    Input.KeyMapperNET = {};
    //Numbers
    for (i = j = 48; j <= 57; i = ++j) {
        Input.KeyMapperNET[i] = String.fromCharCode(i);
    }
    //Numbers NUM LOCK
    for (i = j = 96; j <= 105; i = ++j) {
        Input.KeyMapperNET[i] = 'Numpad' + String(i - 96);
    }

    Input.KeyMapperNET[8] = 'Backspace';
    Input.KeyMapperNET[190] = '.';
    Input.KeyMapperNET[110] =  'NumpadDecimal';

    var alias_atbs_input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function (event) {
        alias_atbs_input_onKeyDown.call(this, event);
        if (event.code && event.code.contains('Numpad')) {
            Input._setStateWithMapperMYP(event.keyCode);
            return;
        }
        if (Input.keyMapper[event.keyCode]) {
            return;
        }
        Input._setStateWithMapperMYP(event.keyCode);
    };

    Input._setStateWithMapperMYP = function (keyCode, state = true) {
        var symbol;
        symbol = Input.KeyMapperNET[keyCode];
        if (symbol != null) {
            this._currentState[symbol] = state;
        }
    };

    var alias_atbs_input_onKeyUp = Input._onKeyUp;
    Input._onKeyUp = function (event) {
        alias_atbs_input_onKeyUp.call(this, event);
        if (event.code && event.code.contains('Numpad')) {
            Input._setStateWithMapperMYP(event.keyCode, false);
            return;
        }
        Input._setStateWithMapperMYP(event.keyCode, false);
    };
})();
// ■ END Input.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//Compressed by MV Plugin Builder
(function(){var _0x1c51 = [
    'length',
    'parameters',
    'NET\x20sync',
    '_insertNetSyncCommand',
    'CMD_SYNC',
    'startNetwork',
    'isStartedFromNetwork',
    'updateWaitMode',
    'eventId',
    'getLastResponseData',
    '_checkWaitCount',
    'error',
    'Server\x20wait\x20error,\x20code\x20-\x20100',
    '_index',
    'LhBkN',
    'command901',
    'CMD\x20900\x20run',
    '_collectEventBasicDataForNetwork',
    'isStartedOutside',
    'GgEFI',
    'sendMessage',
    'setRepeat',
    'setData',
    'RegisterOnSharedEvent',
    'CMD\x20901\x20run',
    'line',
    'WAIT_PLAYER',
    'RegisterOnSharedEventSync',
    'register',
    '_startedOutside',
    '_waitNetCount',
    '_shared',
    'isNeedLineSync',
    '_lineSyncIndex',
    'resetWait',
    'setup',
    '_event',
    'XrKgU',
    '_prepareList_replaceSyncCommand',
    'push',
    'isNetworkSharedMode',
    'isShared',
    '_prepareSharedEvent',
    '_list',
    '_insertNetShareCommand',
    '_prepareEventListForNet',
    '_insertNetCommand',
    'CMD_SHARE',
    'index',
    '_isNetCommandExists',
    'code'
];
(function (_0x1e5f0e, _0x408fe1) {
    var _0xc7d5ab = function (_0x1462a5) {
        while (--_0x1462a5) {
            _0x1e5f0e['push'](_0x1e5f0e['shift']());
        }
    };
    _0xc7d5ab(++_0x408fe1);
}(_0x1c51, 0xe9));
var _0x1561 = function (_0x413f59, _0x12e661) {
    _0x413f59 = _0x413f59 - 0x0;
    var _0x3d536e = _0x1c51[_0x413f59];
    return _0x3d536e;
};
var InterpreterNET;
InterpreterNET = class InterpreterNET {
    constructor() {
        this[_0x1561('0x0')] = ![];
        this['_shared'] = ![];
        this['_lineSyncIndex'] = -0x1;
        this[_0x1561('0x1')] = 0x0;
    }
    ['isStartedOutside']() {
        return this[_0x1561('0x0')] === !![];
    }
    ['isShared']() {
        return this[_0x1561('0x2')] === !![];
    }
    [_0x1561('0x3')]() {
        return this[_0x1561('0x4')] >= 0x0;
    }
    [_0x1561('0x5')]() {
        return this['_waitNetCount'] = 0x0;
    }
    [_0x1561('0x6')](_0x140e42, _0x143c65) {
        this[_0x1561('0x7')] = $gameMap['event'](_0x140e42);
        if (this[_0x1561('0x7')] == null) {
            if (_0x1561('0x8') === 'XrKgU') {
                return;
            } else {
                this[_0x1561('0x9')](i);
                results[_0x1561('0xa')](i--);
            }
        }
        this[_0x1561('0x2')] = this[_0x1561('0x7')][_0x1561('0xb')]();
        if (this[_0x1561('0xc')]()) {
            return this[_0x1561('0xd')](_0x143c65);
        }
    }
    [_0x1561('0xd')](_0x260eee) {
        this[_0x1561('0xe')] = _0x260eee;
        this[_0x1561('0xf')]();
        return this[_0x1561('0x10')]();
    }
    [_0x1561('0xf')]() {
        return this[_0x1561('0x11')]({
            'index': 0x0,
            'replace': ![],
            'code': InterpreterNET[_0x1561('0x12')]
        });
    }
    [_0x1561('0x11')](_0x167275) {
        var _0x4fc30e, _0x895995;
        _0x4fc30e = _0x167275[_0x1561('0x13')] || 0x0;
        _0x895995 = _0x167275['replace'];
        if (this[_0x1561('0x14')](_0x4fc30e, _0x167275['code'])) {
            return;
        }
        return this[_0x1561('0xe')]['splice'](_0x4fc30e, _0x895995, {
            'code': _0x167275[_0x1561('0x15')],
            'indent': 0x0,
            'parameters': []
        });
    }
    ['_isNetCommandExists'](_0x1fb9d9, _0x280db4) {
        return this['_list'][_0x1fb9d9][_0x1561('0x15')] === _0x280db4;
    }
    [_0x1561('0x10')]() {
        var _0x53bbe2, _0x9b4367;
        _0x53bbe2 = this[_0x1561('0xe')][_0x1561('0x16')] - 0x1;
        _0x9b4367 = [];
        while (_0x53bbe2 >= 0x0) {
            this[_0x1561('0x9')](_0x53bbe2);
            _0x9b4367[_0x1561('0xa')](_0x53bbe2--);
        }
        return _0x9b4367;
    }
    ['_prepareList_replaceSyncCommand'](_0x260b76) {
        var _0x130122;
        _0x130122 = this[_0x1561('0xe')][_0x260b76];
        if (_0x130122['code'] !== 0x164) {
            return;
        }
        if (!_0x130122[_0x1561('0x17')][0x0]['contains'](_0x1561('0x18'))) {
            return;
        }
        this[_0x1561('0x19')](_0x260b76);
    }
    [_0x1561('0x19')](_0x1db87d) {
        return this[_0x1561('0x11')]({
            'index': _0x1db87d,
            'replace': !![],
            'code': InterpreterNET[_0x1561('0x1a')]
        });
    }
    [_0x1561('0x1b')]() {
        if (!this['isShared']()) {
            return;
        }
        this[_0x1561('0x0')] = this[_0x1561('0x7')][_0x1561('0x1c')]();
        return this[_0x1561('0x7')]['clearStartFromNetwork']();
    }
    [_0x1561('0x1d')]() {
        var _0x41073, _0xa35796;
        _0xa35796 = this[_0x1561('0x7')][_0x1561('0x1e')]();
        _0x41073 = Network[_0x1561('0x1f')]();
        if (this[_0x1561('0xc')]()) {
            this[_0x1561('0x20')](_0x41073);
        }
        if (_0x41073 === -0x64) {
            Network[_0x1561('0x21')]('', _0x1561('0x22'));
            $gameMap['_interpreter'][_0x1561('0x23')] = 0x64;
            return ![];
        }
        return !(Network[_0x1561('0x1f')]() === _0xa35796);
    }
    [_0x1561('0x20')](_0x2810e0) {
        if (_0x2810e0 == null) {
            this[_0x1561('0x1')] += 0x1;
        }
        if (this[_0x1561('0x1')] >= 0x3c) {
            if (_0x1561('0x24') !== _0x1561('0x24')) {
                return this[_0x1561('0x1')] = 0x0;
            } else {
                this[_0x1561('0x5')]();
                return this[_0x1561('0x25')]();
            }
        }
    }
    ['command900']() {
        var _0x38ed26, _0x3de42b;
        _0x1561('0x26')['p']();
        _0x38ed26 = this['_event'][_0x1561('0x27')]();
        _0x3de42b = Network['WAIT_PLAYER'];
        if (!this[_0x1561('0x28')]()) {
            if ('RVeJj' === _0x1561('0x29')) {
                return this[_0x1561('0x0')] === !![];
            } else {
                _0x38ed26['pageIndex'] = this[_0x1561('0x7')]['findProperPageIndex']();
                Network[_0x1561('0x2a')](NetMessage['StartSharedEvent']()[_0x1561('0x2b')](_0x3de42b)[_0x1561('0x2c')](_0x38ed26));
            }
        } else {
            Network[_0x1561('0x2a')](NetMessage[_0x1561('0x2d')]()[_0x1561('0x2b')](_0x3de42b)[_0x1561('0x2c')](_0x38ed26));
        }
        return !![];
    }
    [_0x1561('0x25')](_0x2c954d) {
        var _0x2960a4, _0x17445c;
        _0x1561('0x2e')['p']();
        _0x2960a4 = this[_0x1561('0x7')][_0x1561('0x27')]();
        _0x2960a4[_0x1561('0x2f')] = _0x2c954d;
        _0x17445c = Network[_0x1561('0x30')];
        Network[_0x1561('0x2a')](NetMessage[_0x1561('0x31')]()[_0x1561('0x2b')](_0x17445c)['setData'](_0x2960a4));
        return !![];
    }
};
InterpreterNET[_0x1561('0x12')] = 0x384;
InterpreterNET[_0x1561('0x1a')] = 0x385;
AlphaNET[_0x1561('0x32')](InterpreterNET);
})();

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ JSONManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  //@[CLASS IMPL ONLY]
  JSONManagerNET._databaseFiles = [
    {
      name: 'CharNameplate',
      src: 'CharNameplate.json'
    }
  ];
  JSONManagerNET.Data = {};
  JSONManagerNET.loadAllFiles = function() {
    return JSONManagerNET._databaseFiles.forEach(function(data) {
      return JSONManagerNET._loadJSON(data.name, data.src);
    });
  };
  JSONManagerNET._loadJSON = function(name, src) {
    var url, xhr;
    xhr = new XMLHttpRequest();
    url = 'data/ANET/' + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
      if (xhr.status < 400) {
        return JSONManagerNET.Data[name] = JSON.parse(xhr.responseText);
      }
    };
    xhr.onerror = function() {};
    JSONManagerNET[name] = null;
    return xhr.send();
  };
  //TODO: CLOSE IN LITE STYLES!!!
  // * PUBLIC DATA GETTERS
  JSONManagerNET.getNamePlateDataForId = function(id) {
    if (JSONManagerNET.Data.CharNameplate == null) {
      return null;
    }
    return JSONManagerNET.Data.CharNameplate[id];
  };
})();

// ■ END JSONManager.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ MakerManager.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[CLASS IMPL ONLY]

    Object.defineProperty(MakerManager, 'childWindow', {
        get: function () {
            return this._childWindow;
        },
        configurable: true
    });

    MakerManager.initManager = function () {
        this._childWindow = null;
        HotSeatKeyMapper.init(null, null);
    };

    MakerManager.setupGameWindow = function () {
        var win = nw.Window.get();
        win.removeAllListeners('close');
        win.on('close', this.onWindowClose.bind(win));

        win.removeAllListeners('restore');
        win.removeAllListeners('focus');
        win.removeAllListeners('minimize');

        win.on('focus', function () {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.restore();
            }
        });
        win.on('restore', function () {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.restore();
            }
        });
        win.on('minimize', function () {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.minimize();
            }
        });

        win.removeAllListeners('move');
        win.on('move', function (x, y) {
            if (MakerManager.childWindow) {
                MakerManager.childWindow.x = x + Graphics.width + 8;
                MakerManager.childWindow.y = y;
            }
        });

    };

    MakerManager.openMaker = function () {
        if (!Utils.isNwjs())
            return;
        if (MakerManager._childWindow == null) {
            HotSeatKeyMapper.init(1, null);
            this.setupGameWindow();
            this.createWindow();
            Network.setHotGame(true);
        }
        else {
            MakerManager.closeMaker();
            MakerManager.deleteMaker();
            MakerManager.openMaker();
        }
    };

    MakerManager.createWindow = function () {
        var win = nw.Window.get();
        var filename = 'www/index.html';
        if (Utils.isOptionValid('test')) {
            filename = 'index.html';
        }
        nw.Window.open(filename, {
            width: win.width - 2,
            height: win.height,
            resizable: false,
            show_in_taskbar: false,
            new_instance: false
        }, function (new_win) {
            MakerManager._childWindow = new_win;
            new_win.on('loaded', this._onWindowCreated.bind(this));
        }.bind(this));
    };

    MakerManager._onWindowCreated = function () {
        this._moveWindow();
        this._setupWindow();
    };

    MakerManager._moveWindow = function () {
        window.moveBy(-400, 0);
        this._childWindow.moveTo(window.screenX + Graphics.boxWidth + 8, window.screenY);
    };

    MakerManager._setupWindow = function () {
        this._childWindow.on('closed', this.deleteMaker.bind(this));
        this._childWindow.on('close', this.closeMaker.bind(this));

        var mapper = this._childWindow.window.HotSeatKeyMapper;
        this._childWindow.window.Network.setHotGame(true);
        HotSeatKeyMapper._mirror = mapper;
        mapper.init(2, HotSeatKeyMapper);
    };

    MakerManager.onWindowClose = function () {
        MakerManager.closeTheWindows.call(this);
    };

    MakerManager.closeMaker = function () {
        HotSeatKeyMapper.init(null, null);
        Network.setHotGame(false);
        this._childWindow.close(true);
    };

    MakerManager.deleteMaker = function () {
        this._childWindow = null;
    };

    MakerManager.closeTheWindows = function () {
        if (MakerManager.childWindow)
            MakerManager.childWindow.close(true);
        this.close(true);
    };

})();
// ■ END MakerManager.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessage.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[GLOBAL]
var NetMessage;

NetMessage = (function() {
  class NetMessage {
    constructor(socket1) {
      this.socket = socket1;
      this.name = "trace";
      this.from = "";
      this.to = "";
      this.data = "";
      this.waited = false;
    }

    setName(name) {
      this.name = name;
      return this;
    }

    setTo(socketId) {
      this.to = socketId;
      return this;
    }

    setFrom(socketId) {
      this.from = socketId;
      return this;
    }

    setData(data) {
      this.data = data;
      return this;
    }

    setWait(symbol) {
      this.waited = true;
      Network.waitServerResponse(this, symbol);
      return this;
    }

    setRepeat(symbol) {
      this.waited = true;
      Network.waitServerResponseRepeated(this, symbol);
      return this;
    }

    send(data) {
      this.socket.emit(this.name, this._makeData(data));
      return this;
    }

    broadcast(data) {
      return this.socket.broadcast.emit(this.name, this._makeData(data));
    }

    _makeData(data = null) {
      var netData;
      netData = {};
      if (data == null) {
        data = this.data;
      } else {
        this.data = data;
      }
      netData.data = data;
      netData.from = this.from;
      netData.to = this.to;
      netData.waited = this.waited;
      return netData;
    }

    static Setup(socket) {
      return NetMessage.Socket = socket;
    }

    static PlayerDisconnect(socket) {
      return this.EmptyMessage(socket).setName('playerDisconnect');
    }

    static PlayerConnect(socket) {
      return this.EmptyMessage(socket).setName('playerConnect');
    }

    static HostResponse(socket) {
      return this.EmptyMessage(socket).setName('host').setFrom('server');
    }

    static AlertMessage(socket) {
      return this.EmptyMessage(socket).setFrom('server').setName('alertMessage');
    }

    static EmptyMessage(socket = null) {
      var msg, targetSocket;
      targetSocket = socket;
      if (socket == null) {
        targetSocket = this.Socket;
      }
      msg = new NetMessage(targetSocket);
      if (targetSocket != null) {
        msg.setFrom(targetSocket.id);
      }
      return msg;
    }

    static CreateSubMessageData(id) {
      var data;
      return data = {
        id: id
      };
    }

  };

  NetMessage.Socket = null;

  return NetMessage;

}).call(this);

AlphaNET.register(NetMessage);

// ■ END NetMessage.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetMessages.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _CM, _M;
  //@[DEFINES]
  _M = NetMessage;
  _CM = function(socket, name) {
    return _M.EmptyMessage(socket).setName(name);
  };
  //?INITIAL
  _M.RequestPlayerData = function(_) {
    return _CM(_, 'requestInitialPlayerData');
  };
  _M.PlayerDataResponse = function(_) {
    return _CM(_, 'responsePlayerData');
  };
  _M.PlayersTableResponse = function(_) {
    return _CM(_, 'playersTableResponse');
  };
  _M.HostGameMapId = function(_) {
    return _CM(_, 'hostGameMapId');
  };
  _M.GameMapEventsDataResponse = function(_) {
    return _CM(_, 'gameMapEventsDataResponse');
  };
  _M.RequestGameMapEventsData = function(_) {
    return _CM(_, 'requestGameMapEventsData');
  };
  //?PLAYERS
  _M.PlayerMoveData = function(_) {
    return _CM(_, 'playerMove');
  };
  _M.PlayerNetIcon = function(_) {
    return _CM(_, 'playerIcon');
  };
  _M.PlayerNetActorData = function(_) {
    return _CM(_, 'playerNetActorData');
  };
  _M.PlayerNetItemsData = function(_) {
    return _CM(_, 'playerNetItemsData');
  };
  _M.PlayerWorldData = function(_) {
    return _CM(_, 'playerWorldData');
  };
  _M.GlobalWorldData = function(_) {
    return _CM(_, 'globalWorldData');
  };
  _M.PlayerNetMapData = function(_) {
    return _CM(_, 'playerNetCurrentMapData');
  };
  _M.PlayerChangeMap = function(_) {
    return _CM(_, 'playerChangeMap');
  };
  _M.SetOwner = function(_) {
    return _CM(_, 'setMapOwner');
  };
  _M.RequestPvP = function(_) {
    return _CM(_, 'requestPvPWithAnotherPlayer');
  };
  _M.StartPvPBattle = function(_) {
    return _CM(_, 'startPvPWithAnotherPlayer');
  };
  //?EVENTS
  _M.MapEventMoveData = function(_) {
    return _CM(_, 'mapEventMove');
  };
  _M.SyncEvent = function(_) {
    return _CM(_, 'mapEventSync');
  };
  _M.LockEvent = function(_) {
    return _CM(_, 'mapEventLock');
  };
  _M.OwnEvent = function(_) {
    return _CM(_, 'mapEventOwn');
  };
  _M.StartSharedEvent = function(_) {
    return _CM(_, 'startSharedEvent');
  };
  _M.RegisterOnSharedEvent = function(_) {
    return _CM(_, 'registerOnSharedEvent');
  };
  _M.RegisterOnSharedEventSync = function(_) {
    return _CM(_, 'registerOnSharedEventSync');
  };
  _M.VirtualInterpreter = function(_) {
    return _CM(_, 'virtualInterpreter');
  };
  //?WINDOWS
  _M.WindowSelect = function(_) {
    return _CM(_, 'window_select_data');
  };
  //?BATTLE
  _M.BattleInputCommand = function(_) {
    return _CM(_, 'battle_inputCommand');
  };
  _M.BattleBattlerRefreshData = function(_) {
    return _CM(_, 'battle_refreshData');
  };
  _M.BattleAction = function(_) {
    return _CM(_, 'battle_action');
  };
  _M.BattleManager = function(_) {
    return _CM(_, 'battle_manager');
  };
  _M.BattleManagerPvP = function(_) {
    return _CM(_, 'battle_manager_pvp');
  };
  //?GLOBAL
  _M.OnWaitResponse = function(_) {
    return _CM(_, 'onWaitResponse');
  };
  _M.RequestSync = function(_) {
    return _CM(_, 'requestSync');
  };
  //?API
  _M.CallUApi = function(_) {
    return _CM(_, 'callUApi');
  };
  //?{TEST}
  _M.TempMessage = function(_) {
    return _CM(_, 'tempMessage');
  };
})();

// ■ END NetMessages.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetParameters.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetParameters;
  // * Если параметры не были загружены, будет возвращять стандартные значения автоматически
  NetParameters = class NetParameters extends KDCore.ParametersManager {
    constructor() {
      super('Alpha NET');
    }

    get_actorsForPlayers() {
      var name;
      if (this.isLoaded()) {
        name = 'ActorsForPlayers';
        return this.getFromCacheOrInit(name, function() {
          var obj;
          try {
            obj = this.getString(name);
            return obj.split(',').map(function(i) {
              return Number(i);
            });
          } catch (error) {
            AlphaNET.warning('wrong plugin parameter Actors for players');
            return [1, 2];
          }
        });
      } else {
        return [1, 2, 3, 4];
      }
    }

    isMultiGameMode() {
      var name;
      if (!this.isLoaded()) {
        return false;
      }
      name = 'GameMode';
      return this.getFromCacheOrInit(name, function() {
        var obj;
        try {
          obj = this.getString(name);
          if (obj === 'Multiplayer') {
            return true;
          }
          return false;
        } catch (error) {
          AlphaNET.warning('wrong plugin parameter: Game Mode');
          return false;
        }
      });
    }

    load_CommonEventsForNetwork() {
      if (!this.isLoaded()) {
        return;
      }
      try {
        Network.commonEventOnServerStarted = this.getNumber("ServerStarted");
        Network.commonEventOnConnectToServer = this.getNumber("OnConnect");
        Network.commonEventOnDisconectFromServer = this.getNumber("OnDisconect");
        Network.commonEventOnOtherClientConnected = this.getNumber("OnOtherCon");
        Network.commonEventOnOtherClientDisconected = this.getNumber("OnOtherDisc");
        Network.commonEventOnPvPBattleEnd = this.getNumber("OnPvPEnd");
      } catch (error) {
        return AlphaNET.warning('wrong plugin parameters for network common events');
      }
    }

    get_ShowNameplatesMode() {
      var name;
      if (!this.isLoaded()) {
        return 1;
      }
      name = 'NameplatesMode';
      return this.getFromCacheOrInit(name, function() {
        var obj;
        try {
          obj = this.getString(name);
          if (obj === 'Others') {
            return 1;
          }
          if (obj === 'All') {
            return 2;
          }
          return 0; // * Never
        } catch (error) {
          AlphaNET.warning('wrong plugin parameter: Nameplate display mode');
          return 0;
        }
      });
    }

  };
  AlphaNET.register(NetParameters);
  AlphaNET.Parameters = new NetParameters();
})();

// ■ END NetParameters.coffee
//---------------------------------------------------------------------------

//Compressed by MV Plugin Builder
(function(){var _0x1bca = [
    'getPlayer',
    'playerData',
    'getPlayerByIndex',
    'rcpZK',
    'jimkC',
    'players',
    'getPlayerByActorId',
    'mOazS',
    'faWbk',
    'getActorIdBySocketId',
    'setDataFromNetwork',
    'refresh',
    'findElementByField',
    'getMe',
    'getHost',
    'jOYVh',
    'error',
    'getCharById',
    'followers',
    'getNetworkCharById',
    'getMyPlayerIndex',
    'wZjef',
    'TToho',
    'indexOf',
    'memberByActorId',
    'stringify',
    'getMyPlayerSprite',
    'wavwo',
    'gKRCu',
    'getPlayerSpriteById',
    'myId',
    '_data',
    'isCurrentSceneIsMap',
    '_scene',
    '_characterSprites',
    'forEach',
    '_character',
    'bNToP',
    'ISkYw',
    'requestRefresh',
    'isCurrentSceneIsMenuBased',
    'safeRefreshCurrentScene',
    'LIBS',
    'NetworkCharacter',
    'netId',
    'oATHw',
    'enVSf',
    'SBJlr',
    'while\x20get\x20character\x20sprite\x20on\x20map',
    'QVgTM',
    'removeActor',
    'networkActorsId',
    'dBkVy',
    'REGISTER\x20PLAYER',
    'NetworkPlayerData',
    'first',
    'delete',
    'removePlayer',
    'ivfBC',
    'tczaC',
    'REMOVE\x20PLAYER',
    'unshift',
    'coOry',
    'refreshNetwork',
    'synchronize',
    'kIOfw',
    'isEventRunning',
    'getMyActorDataForNetwork',
    'mBvcw',
    'diLcl',
    'PlayerNetItemsData',
    'isMultiMode',
    'synchronizeMapData',
    'Rjwki',
    'mapId',
    'PlayerNetMapData',
    'ibSAp',
    'while\x20try\x20synchronize\x20actor\x20Data\x20from\x20Network',
    'while\x20try\x20collect\x20actor\x20Data\x20to\x20synchronize',
    'RnIgz',
    'xpwfW',
    'parse',
    'XhFbA',
    'afnGd',
    'onActroItemsFromNetwork',
    'egYgx',
    'clearParty',
    'mbBRb',
    'bgFMk',
    'myPlayerData',
    'members',
    'length',
    'actorId',
    'push',
    'addActor',
    'getMyActorId',
    'refreshParty',
    'sendMessage',
    'PlayerNetActorData',
    'setData',
    'KhkzJ',
    'refreshCharacters'
];
(function (_0x30a07a, _0x17d469) {
    var _0x46f06a = function (_0x5ee501) {
        while (--_0x5ee501) {
            _0x30a07a['push'](_0x30a07a['shift']());
        }
    };
    _0x46f06a(++_0x17d469);
}(_0x1bca, 0x1ee));
var _0x19d8 = function (_0x3b5159, _0x4d04c3) {
    _0x3b5159 = _0x3b5159 - 0x0;
    var _0x30730a = _0x1bca[_0x3b5159];
    return _0x30730a;
};
(function () {
    NetPartyManager[_0x19d8('0x0')] = function () {
        if (_0x19d8('0x1') !== _0x19d8('0x2')) {
            var _0x343d77, _0x35e568, _0x460dba, _0x687c12, _0x129892;
            if (Network[_0x19d8('0x3')] == null) {
                return;
            }
            'CLEAR\x20PARTY'['p']();
            _0x687c12 = $gameParty[_0x19d8('0x4')]();
            for (_0x343d77 = _0x35e568 = _0x129892 = _0x687c12[_0x19d8('0x5')] - 0x1; _0x129892 <= 0x0 ? _0x35e568 <= 0x0 : _0x35e568 >= 0x0; _0x343d77 = _0x129892 <= 0x0 ? ++_0x35e568 : --_0x35e568) {
                _0x460dba = _0x687c12[_0x343d77];
                if (_0x460dba != null) {
                    $gameParty['removeActor'](_0x460dba[_0x19d8('0x6')]());
                    Network['networkActorsId'][_0x19d8('0x7')](_0x460dba['actorId']());
                }
            }
            return $gameParty[_0x19d8('0x8')](NetPartyManager[_0x19d8('0x9')]());
        } else {
            var _0xf21e8f;
            _0xf21e8f = NetPartyManager['getPlayer'](id);
            return _0xf21e8f[_0x19d8('0x6')];
        }
    };
    NetPartyManager[_0x19d8('0xa')] = function () {
        if ('rmzmC' !== 'rmzmC') {
            Network[_0x19d8('0xb')](NetMessage[_0x19d8('0xc')]()[_0x19d8('0xd')](data));
        } else {
            var _0x5392f8, _0x344c50, _0x2055f3;
            for (_0x5392f8 = _0x344c50 = 0x1, _0x2055f3 = Network['players'][_0x19d8('0x5')]; 0x1 <= _0x2055f3 ? _0x344c50 < _0x2055f3 : _0x344c50 > _0x2055f3; _0x5392f8 = 0x1 <= _0x2055f3 ? ++_0x344c50 : --_0x344c50) {
                if ('KhkzJ' !== _0x19d8('0xe')) {
                    result = sprite;
                } else {
                    $gameParty[_0x19d8('0x8')](Network['players'][_0x5392f8]['actorId']);
                }
            }
            NetPartyManager[_0x19d8('0xf')]();
            return $gameMap['requestNetworkRefresh']();
        }
    };
    NetPartyManager[_0x19d8('0x10')] = function (_0x318f4c) {
        return Network[_0x19d8('0x11')](_0x318f4c);
    };
    NetPartyManager[_0x19d8('0x12')] = function (_0xe64761) {
        if (_0x19d8('0x13') !== _0x19d8('0x14')) {
            return Network[_0x19d8('0x15')][_0xe64761];
        } else {
            return;
        }
    };
    NetPartyManager[_0x19d8('0x16')] = function (_0x53c692) {
        if (_0x19d8('0x17') === _0x19d8('0x18')) {
            if (data == null) {
                return;
            }
            _0x53c692 = NetPartyManager[_0x19d8('0x19')](socketId);
            if (data != null) {
                $gameParty[_0x19d8('0x1a')](data);
            }
            NetPartyManager[_0x19d8('0x1b')]();
        } else {
            return Network[_0x19d8('0x15')][_0x19d8('0x1c')](_0x19d8('0x6'), _0x53c692);
        }
    };
    NetPartyManager['getMe'] = function () {
        return Network['myPlayerData'];
    };
    NetPartyManager['getMyActorId'] = function () {
        return NetPartyManager[_0x19d8('0x1d')]()[_0x19d8('0x6')];
    };
    NetPartyManager[_0x19d8('0x1e')] = function () {
        if (_0x19d8('0x1f') === _0x19d8('0x1f')) {
            return NetPartyManager[_0x19d8('0x12')](0x0);
        } else {
            e = error;
            AlphaNET[_0x19d8('0x20')](e, 'while\x20try\x20synchronize\x20actor\x20Data\x20from\x20Network');
        }
    };
    NetPartyManager[_0x19d8('0x21')] = function (_0x1757b0) {
        return $gamePlayer[_0x19d8('0x22')]()[_0x19d8('0x23')](_0x1757b0);
    };
    NetPartyManager[_0x19d8('0x24')] = function () {
        if (_0x19d8('0x25') !== _0x19d8('0x26')) {
            return Network['players'][_0x19d8('0x27')](NetPartyManager[_0x19d8('0x1d')]()) + 0x1;
        } else {
            id = NetPartyManager[_0x19d8('0x9')]();
            actor = $gameParty[_0x19d8('0x28')](id);
            data = JsonEx[_0x19d8('0x29')](actor);
            return data;
        }
    };
    NetPartyManager[_0x19d8('0x2a')] = function () {
        if (_0x19d8('0x2b') !== _0x19d8('0x2c')) {
            return NetPartyManager[_0x19d8('0x2d')](Network[_0x19d8('0x2e')]());
        } else {
            actorId = NetPartyManager[_0x19d8('0x19')](socketId);
            parsed = JsonEx['parse'](data);
            if ($gameActors[_0x19d8('0x2f')][actorId] == null) {
                return;
            }
            $gameActors[_0x19d8('0x2f')][actorId] = parsed;
            NetPartyManager['refresh']();
        }
    };
    NetPartyManager[_0x19d8('0x2d')] = function (_0x305b81) {
        var _0x33b548, _0x22f974, _0x2631fd, _0x581a44;
        if (!SceneManager[_0x19d8('0x30')]()) {
            return null;
        }
        try {
            _0x22f974 = null;
            _0x581a44 = SceneManager[_0x19d8('0x31')]['_spriteset'];
            if (_0x581a44 != null) {
                _0x2631fd = _0x581a44[_0x19d8('0x32')];
                if (_0x2631fd != null) {
                    _0x2631fd[_0x19d8('0x33')](function (_0xac46d8) {
                        if (_0xac46d8[_0x19d8('0x34')] != null) {
                            if (_0xac46d8['_character'] instanceof Game_Player) {
                                if (_0x305b81 === Network[_0x19d8('0x2e')]()) {
                                    if (_0x19d8('0x35') === _0x19d8('0x36')) {
                                        if (SceneManager[_0x19d8('0x30')]()) {
                                            NetPartyManager[_0x19d8('0xf')]();
                                            $gameMap[_0x19d8('0x37')]();
                                        }
                                        if (SceneManager[_0x19d8('0x38')]()) {
                                            return SceneManager[_0x19d8('0x39')]();
                                        }
                                    } else {
                                        _0x22f974 = _0xac46d8;
                                    }
                                }
                            }
                            if (_0xac46d8['_character'] instanceof AlphaNET[_0x19d8('0x3a')][_0x19d8('0x3b')]) {
                                if (_0xac46d8['_character'][_0x19d8('0x3c')] === _0x305b81) {
                                    if (_0x19d8('0x3d') !== _0x19d8('0x3e')) {
                                        return _0x22f974 = _0xac46d8;
                                    } else {
                                        $gameParty['removeActor'](member[_0x19d8('0x6')]());
                                        Network['networkActorsId'][_0x19d8('0x7')](member[_0x19d8('0x6')]());
                                    }
                                }
                            }
                        }
                    });
                }
            }
            return _0x22f974;
        } catch (_0x14d218) {
            if (_0x19d8('0x3f') !== _0x19d8('0x3f')) {
                return Network['myPlayerData'];
            } else {
                _0x33b548 = _0x14d218;
                AlphaNET['error'](_0x33b548, _0x19d8('0x40'));
            }
        }
        return null;
    };
    NetPartyManager[_0x19d8('0x19')] = function (_0x13a345) {
        if (_0x19d8('0x41') !== _0x19d8('0x41')) {
            var _0x1b816b, _0xc1f9c3, _0x5788d6, _0x23d504, _0x4f8c15;
            if (Network[_0x19d8('0x3')] == null) {
                return;
            }
            'CLEAR\x20PARTY'['p']();
            _0x23d504 = $gameParty[_0x19d8('0x4')]();
            for (_0x1b816b = _0xc1f9c3 = _0x4f8c15 = _0x23d504[_0x19d8('0x5')] - 0x1; _0x4f8c15 <= 0x0 ? _0xc1f9c3 <= 0x0 : _0xc1f9c3 >= 0x0; _0x1b816b = _0x4f8c15 <= 0x0 ? ++_0xc1f9c3 : --_0xc1f9c3) {
                _0x5788d6 = _0x23d504[_0x1b816b];
                if (_0x5788d6 != null) {
                    $gameParty[_0x19d8('0x42')](_0x5788d6[_0x19d8('0x6')]());
                    Network[_0x19d8('0x43')]['push'](_0x5788d6[_0x19d8('0x6')]());
                }
            }
            return $gameParty[_0x19d8('0x8')](NetPartyManager['getMyActorId']());
        } else {
            var _0x2517be;
            _0x2517be = NetPartyManager[_0x19d8('0x10')](_0x13a345);
            return _0x2517be['actorId'];
        }
    };
    NetPartyManager['registerNewPlayer'] = function (_0x1ebea2) {
        if (_0x19d8('0x44') === _0x19d8('0x44')) {
            var _0x285ee6, _0x415461;
            _0x19d8('0x45')['p'](_0x1ebea2);
            _0x415461 = new AlphaNET[(_0x19d8('0x3a'))][(_0x19d8('0x46'))](_0x1ebea2);
            _0x285ee6 = Network[_0x19d8('0x43')][_0x19d8('0x47')]();
            _0x415461['setActorId'](_0x285ee6);
            Network[_0x19d8('0x43')][_0x19d8('0x48')](_0x285ee6);
            return Network['players'][_0x19d8('0x7')](_0x415461);
        } else {
            e = error;
            AlphaNET['error'](e, _0x19d8('0x40'));
        }
    };
    NetPartyManager[_0x19d8('0x49')] = function (_0x60e84c) {
        if (_0x19d8('0x4a') === _0x19d8('0x4b')) {
            if (netId === Network['myId']()) {
                result = sprite;
            }
        } else {
            var _0x474ca7;
            _0x474ca7 = NetPartyManager[_0x19d8('0x10')](_0x60e84c);
            if (_0x474ca7 == null) {
                return;
            }
            _0x19d8('0x4c')['p'](_0x60e84c);
            Network[_0x19d8('0x15')][_0x19d8('0x48')](_0x474ca7);
            $gameParty[_0x19d8('0x42')](_0x474ca7['actorId']);
            Network[_0x19d8('0x43')][_0x19d8('0x4d')](_0x474ca7[_0x19d8('0x6')]);
            return NetPartyManager[_0x19d8('0xf')]();
        }
    };
    NetPartyManager[_0x19d8('0xf')] = function () {
        if (_0x19d8('0x4e') === 'coOry') {
            return $gamePlayer[_0x19d8('0x22')]()[_0x19d8('0x4f')]();
        } else {
            if (sprite[_0x19d8('0x34')][_0x19d8('0x3c')] === netId) {
                return result = sprite;
            }
        }
    };
    NetPartyManager[_0x19d8('0x50')] = function () {
        var _0x1430b3, _0x380858;
        if (SceneManager['isCurrentSceneIsBattle']()) {
            if (_0x19d8('0x51') !== _0x19d8('0x51')) {
                return $gamePlayer[_0x19d8('0x22')]()[_0x19d8('0x23')](id);
            } else {
                return;
            }
        }
        if ($gameMap[_0x19d8('0x52')]()) {
            return;
        }
        _0x1430b3 = NetPartyManager[_0x19d8('0x53')]();
        if (_0x1430b3 != null) {
            Network[_0x19d8('0xb')](NetMessage[_0x19d8('0xc')]()[_0x19d8('0xd')](_0x1430b3));
        }
        _0x380858 = $gameParty['getDataForNetwork']();
        if (_0x380858 != null) {
            if (_0x19d8('0x54') !== _0x19d8('0x55')) {
                Network[_0x19d8('0xb')](NetMessage[_0x19d8('0x56')]()['setData'](_0x380858));
            } else {
                return;
            }
        }
        if (Network[_0x19d8('0x57')]()) {
            NetPartyManager[_0x19d8('0x58')]();
        }
    };
    NetPartyManager[_0x19d8('0x58')] = function () {
        if (_0x19d8('0x59') !== _0x19d8('0x59')) {
            return NetPartyManager['getPlayerByIndex'](0x0);
        } else {
            var _0x438162;
            _0x438162 = $gameMap[_0x19d8('0x5a')]();
            Network[_0x19d8('0xb')](NetMessage[_0x19d8('0x5b')]()[_0x19d8('0xd')](_0x438162));
        }
    };
    NetPartyManager[_0x19d8('0x53')] = function () {
        var _0x24c75a, _0x5a9596, _0x2e7195, _0x135c77;
        try {
            if (_0x19d8('0x5c') !== _0x19d8('0x5c')) {
                _0x2e7195 = error;
                AlphaNET[_0x19d8('0x20')](_0x2e7195, _0x19d8('0x5d'));
            } else {
                _0x135c77 = NetPartyManager['getMyActorId']();
                _0x24c75a = $gameParty[_0x19d8('0x28')](_0x135c77);
                _0x5a9596 = JsonEx[_0x19d8('0x29')](_0x24c75a);
                return _0x5a9596;
            }
        } catch (_0x227485) {
            _0x2e7195 = _0x227485;
            return AlphaNET[_0x19d8('0x20')](_0x2e7195, _0x19d8('0x5e'));
        }
    };
    NetPartyManager['onActorDataFromNetwork'] = function (_0x54b266, _0x5c1eef) {
        if (_0x19d8('0x5f') === _0x19d8('0x60')) {
            var _0x26eac9, _0x468589, _0x5e6cba;
            try {
                _0x26eac9 = NetPartyManager['getActorIdBySocketId'](_0x54b266);
                _0x5e6cba = JsonEx[_0x19d8('0x61')](_0x5c1eef);
                if ($gameActors[_0x19d8('0x2f')][_0x26eac9] == null) {
                    return;
                }
                $gameActors[_0x19d8('0x2f')][_0x26eac9] = _0x5e6cba;
                NetPartyManager['refresh']();
            } catch (_0x5ab69c) {
                _0x468589 = _0x5ab69c;
                AlphaNET['error'](_0x468589, _0x19d8('0x5d'));
            }
        } else {
            var _0x1c8735, _0x33be7d, _0x431b91;
            try {
                _0x1c8735 = NetPartyManager['getActorIdBySocketId'](_0x54b266);
                _0x431b91 = JsonEx['parse'](_0x5c1eef);
                if ($gameActors[_0x19d8('0x2f')][_0x1c8735] == null) {
                    if ('AtRHL' !== 'xQRWS') {
                        return;
                    } else {
                        var _0x30e004;
                        _0x30e004 = NetPartyManager['getPlayer'](id);
                        if (_0x30e004 == null) {
                            return;
                        }
                        _0x19d8('0x4c')['p'](id);
                        Network[_0x19d8('0x15')][_0x19d8('0x48')](_0x30e004);
                        $gameParty[_0x19d8('0x42')](_0x30e004[_0x19d8('0x6')]);
                        Network[_0x19d8('0x43')]['unshift'](_0x30e004['actorId']);
                        return NetPartyManager[_0x19d8('0xf')]();
                    }
                }
                $gameActors[_0x19d8('0x2f')][_0x1c8735] = _0x431b91;
                NetPartyManager['refresh']();
            } catch (_0x2c1142) {
                _0x33be7d = _0x2c1142;
                AlphaNET[_0x19d8('0x20')](_0x33be7d, _0x19d8('0x5d'));
            }
        }
    };
    NetPartyManager[_0x19d8('0x1b')] = function () {
        if (_0x19d8('0x62') !== _0x19d8('0x63')) {
            if (SceneManager[_0x19d8('0x30')]()) {
                NetPartyManager[_0x19d8('0xf')]();
                $gameMap[_0x19d8('0x37')]();
            }
            if (SceneManager[_0x19d8('0x38')]()) {
                return SceneManager[_0x19d8('0x39')]();
            }
        } else {
            return Network[_0x19d8('0x15')][_0x19d8('0x1c')](_0x19d8('0x6'), actorId);
        }
    };
    NetPartyManager[_0x19d8('0x64')] = function (_0x3e10c8, _0x314fd6) {
        if (_0x19d8('0x65') !== 'YpRee') {
            var _0x288dc7, _0x18c3f8;
            try {
                if (_0x314fd6 == null) {
                    return;
                }
                _0x288dc7 = NetPartyManager[_0x19d8('0x19')](_0x3e10c8);
                if (_0x314fd6 != null) {
                    $gameParty['setDataFromNetwork'](_0x314fd6);
                }
                NetPartyManager[_0x19d8('0x1b')]();
            } catch (_0x5c14c1) {
                _0x18c3f8 = _0x5c14c1;
                AlphaNET[_0x19d8('0x20')](_0x18c3f8, _0x19d8('0x5d'));
            }
        } else {
            var _0x442b10, _0x28a11f;
            _0x19d8('0x45')['p'](id);
            _0x28a11f = new AlphaNET['LIBS'][(_0x19d8('0x46'))](id);
            _0x442b10 = Network['networkActorsId'][_0x19d8('0x47')]();
            _0x28a11f['setActorId'](_0x442b10);
            Network[_0x19d8('0x43')][_0x19d8('0x48')](_0x442b10);
            return Network[_0x19d8('0x15')]['push'](_0x28a11f);
        }
    };
}());
})();

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetPlayerWorldData.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetPlayerWorldData;
  NetPlayerWorldData = class NetPlayerWorldData {
    constructor() {
      this.actorData = null;
      this.actorItems = null;
      this.variablesData = [];
      this.selfSwitchData = [];
      this.switchData = [];
    }

    setActorData(data) {
      return this.actorData = data;
    }

    getActorData() {
      return this.actorData;
    }

    setActorItems(data) {
      return this.actorItems = data;
    }

    getActorItems() {
      return this.actorItems;
    }

    setWorldData(data) {
      var e;
      try {
        this.variablesData = data.variablesData;
        this.switchData = data.switchData;
        return this.selfSwitchData = data.selfSwitchData;
      } catch (error) {
        e = error;
        return Network.error(e, 'while try save World Data for player');
      }
    }

    getWorldDataNetwork() {
      var data;
      return data = {
        variablesData: JSON.stringify(this.variablesData),
        switchData: JSON.stringify(this.switchData),
        selfSwitchData: JSON.stringify(this.selfSwitchData)
      };
    }

    makeSaveContents(actorId) {
      var saveData, world;
      world = {
        variablesData: this.variablesData,
        switchData: this.switchData,
        selfSwitchData: this.selfSwitchData
      };
      saveData = {
        world: world,
        actorItems: this.actorItems,
        actorData: $gameActors._data[actorId]
      };
      return saveData;
    }

  };
  AlphaNET.register(NetPlayerWorldData);
})();

// ■ END NetPlayerWorldData.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetSessionData.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetSessionData;
  NetSessionData = class NetSessionData {
    constructor() {
      this._actorsData = {};
      this._globalData = new AlphaNET.LIBS.NetPlayerWorldData();
    }

    setPlayerActorData(actorId, data) {
      this._checkActorWorldData(actorId);
      //"PLAYER DATA SAVED TO SESSION".p(actorId)
      this.getAllData(actorId).setActorData(data);
    }

    getPlayerActorData(actorId) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).getActorData();
    }

    setPlayerItemsData(actorId, data) {
      this._checkActorWorldData(actorId);
      this.getAllData(actorId).setActorItems(data);
    }

    getPlayerItemsrData(actorId) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).getActorItems();
    }

    hasInfoAbout(actorId) {
      return this._actorsData[actorId] != null;
    }

    getAllData(actorId) {
      return this._actorsData[actorId];
    }

    getGlobalData() {
      return this._globalData;
    }

    setPlayerWorldData(actorId, data) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).setWorldData(data);
    }

    getPlayerWorldData(actorId) {
      this._checkActorWorldData(actorId);
      return this.getAllData(actorId).getWorldData();
    }

    makeSaveContents() {
      var _actorsData, g, item, saveData;
      _actorsData = {};
      for (item in this._actorsData) {
        if (this._actorsData.hasOwnProperty(item)) {
          if (this._actorsData[item].actorData != null) {
            _actorsData[item] = this._actorsData[item].makeSaveContents(item);
          }
        }
      }
      g = this._globalData.makeSaveContents();
      return saveData = {
        global: g,
        actorsData: _actorsData
      };
    }

    extractSaveContents(content) {
      var e, item, results;
      try {
        this._loadDataToWorldObject(this._globalData, content.global);
        results = [];
        for (item in content.actorsData) {
          if (content.actorsData.hasOwnProperty(item)) {
            this._actorsData[item] = new AlphaNET.LIBS.NetPlayerWorldData();
            results.push(this._loadDataToWorldObject(this._actorsData[item], content.actorsData[item]));
          } else {
            results.push(void 0);
          }
        }
        return results;
      } catch (error) {
        e = error;
        return AlphaNET.error(e, ' while load network world save data');
      }
    }

    _loadDataToWorldObject(obj, data) {
      var e;
      try {
        obj.actorItems = data.actorItems;
        if (data.actorData != null) {
          obj.actorData = JsonEx.stringify(data.actorData);
        }
        return obj.setWorldData(data.world);
      } catch (error) {
        e = error;
        return AlphaNET.error(e, ' while extract network world save data');
      }
    }

    _checkActorWorldData(actorId) {
      if (!this.hasInfoAbout(actorId)) {
        this._actorsData[actorId] = new AlphaNET.LIBS.NetPlayerWorldData();
      }
    }

  };
  AlphaNET.register(NetSessionData);
})();

// ■ END NetSessionData.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetWaitPool.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetWaitPool;
  NetWaitPool = class NetWaitPool {
    constructor(waitId) {
      this.waitId = waitId;
      this._clients = [];
      this.resetPool();
    }

    addClient(clientId, isReady = false) {
      if (this._getClientIndex(clientId) < 0) {
        this._clients.push(clientId);
      }
      if (isReady === true) {
        return this.setClientReady(clientId);
      }
    }

    _getClientIndex(clientId) {
      return this._clients.indexOf(clientId);
    }

    setClientReady(clientId) {
      return this._statuses[this._getClientIndex(clientId)] = true;
    }

    isPoolReady() {
      return this._statuses.every(function(status) {
        return status === true;
      });
    }

    resetPool() {
      return this._statuses = []; // * Массив готовности
    }

    getPoolSize() {
      return this._clients.length;
    }

  };
  AlphaNET.register(NetWaitPool);
})();

// ■ END NetWaitPool.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Network.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  //@[CLASS HEADER PART]
  //@[CLASS IMPL ONLY]
  Network.commonEventOnServerStarted = 0;
  Network.commonEventOnConnectToServer = 0;
  Network.commonEventOnDisconectFromServer = 0;
  Network.commonEventOnOtherClientConnected = 0;
  Network.commonEventOnOtherClientDisconected = 0;
  Network.commonEventOnPvPBattleEnd = 0;
  Network.maximumNetworkPlayers = 4;
  Network.networkActorsId = [
    1,
    2,
    3,
    4 // * This is mutable (меняется во время игры)
  ];
  Network.SERVER_UPDATE_TIME = 500;
  Network.WAIT_SERVER = 0;
  Network.WAIT_PLAYER = 1;
  Network.ICON_NONE = -1;
  Network.ICON_MESSAGE = 1;
  Network.ICON_MENU = 2;
  Network.ICON_SHOP = 3;
  Network.ICON_WAIT = 4;
  Network.ICON_BATTLE = 5;
  Network.PVP_WIN = 0;
  Network.PVP_DEFEAT = 2;
  Network.isConnected = function() {
    return this._isConnected === true;
  };
  Network.isHost = function() {
    return Network.isConnected() && this._isHost === true;
  };
  Network.isHotGame = function() {
    return this._isHotGame === true;
  };
  Network.isBusy = function() {
    return this._isBusy === true;
  };
  Network.myId = function() {
    if (Network.isConnected()) {
      return this.socket.id;
    }
  };
  Network.playerData = function(id) {
    return Network.players.findElementByField('id', id);
  };
  Network.isHotHost = function() {
    return Network.isHotGame() && Network.isHost();
  };
  Network.inBattle = function() {
    return this._inBattle === true;
  };
  Network.allowConnect = function() {
    return this._allowConnection === true;
  };
  Network.canClientConnect = function() {
    return Network._checkCanConnect();
  };
  Network.canConnectToServer = function() {
    return Network._checkCanConnectToServer();
  };
  Network.isMultiMode = function() {
    return this._isMultiplayerMode === true;
  };
  Network.isMapOwner = function() {
    return Network.isMultiMode() && this._isMapOwner === true;
  };
  Network.inPvPBattle = function() {
    return this._inPvPBattle === true;
  };
  Network.isPvPBattleServer = function() {
    return this._isPvPBattleServer === true;
  };
  Network.isPvPBattleWin = function() {
    return this._lastPvPResult === Network.PVP_WIN;
  };
  Network.isPvPBattleLoose = function() {
    return this._lastPvPResult === Network.PVP_DEFEAT;
  };
  Network.startServer = function() {
    return Network._startServer();
  };
  Network.stopServer = function() {
    var ref;
    return (ref = this.server) != null ? ref.stop() : void 0;
  };
  Network.connectToServer = function() {
    return Network._connectToServer();
  };
  Network.disconnect = function() {
    var ref;
    return (ref = this.client) != null ? ref.disconnect() : void 0;
  };
  Network.sendMessage = function(netMessage) {
    if (!Network.isConnected()) {
      return;
    }
    netMessage.setFrom(this.socket.id).send();
  };
  Network.sendIcon = function(iconId) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    if (iconId == null) {
      iconId = Network.ICON_NONE;
    }
    msg = NetMessage.PlayerNetIcon().setData(iconId);
    return Network.sendMessage(msg);
  };
  Network.requestSync = function(syncId) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    msg = NetMessage.RequestSync().setData(syncId).setRepeat(Network.WAIT_PLAYER);
    return Network.sendMessage(msg);
  };
  // * INNER METHOD (Call by client)
  Network.requestPvPBattle = function(anotherPlayerIndex) {
    var data, msg;
    if (!Network.isConnected()) {
      return;
    }
    if (!Network.isMultiMode()) {
      return;
    }
    //data = {
    //    who: NetPartyManager.getMyPlayerIndex(), # * MY INDEX
    //    with: anotherPlayerIndex # * RIVAL PLAYER INDEX
    //}
    data = anotherPlayerIndex;
    msg = NetMessage.RequestPvP().setData(data); //.setRepeat('pvp_start')
    Network.sendMessage(msg);
    return this._isPvPBattleServer = true;
  };
  //?{TEST}
  Network.sendTemp = function(data) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    msg = NetMessage.TempMessage().setData(data);
    return Network.sendMessage(msg);
  };
  Network.sendTempWait = function(data) {
    var msg;
    if (!Network.isConnected()) {
      return;
    }
    msg = NetMessage.TempMessage().setRepeat().setData(data);
    return Network.sendMessage(msg);
  };
  AlphaNET.register(Network);
})();

// ■ END Network.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Network_private.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var LOG;
  LOG = new KDCore.DevLog("Network");
  LOG.on();
  LOG.setColors(KDCore.Color.BLUE, KDCore.Color.BLACK.getLightestColor(235));
  
  //@[CLASS PRIVATE PART]
  //@[CLASS IMPL ONLY]
  Network.ip = 'localhost';
  Network.port = 3032;
  Network.initialize = function() {
    LOG.p("Initialized on " + Network.ip + " : " + Network.port);
    this.socket = null;
    this._isConnected = false;
    this._isHost = false;
    this._isHotGame = false;
    this._isBusy = false;
    this._thread = null;
    this.players = [];
    this.myPlayerData = null;
    this._waitMode = 0;
    this._allowConnection = true;
    this._isMultiplayerMode = AlphaNET.Parameters.isMultiGameMode();
    if (this._isMultiplayerMode) {
      LOG.p("Warning! Multiplayer game mode. Global Events are disabled");
    }
    this._isMapOwner = false;
    this.sessionData = null;
    this._inPvPBattle = false;
    this._isPvPBattleServer = false;
    this._lastPvPResult = -1;
    Network.networkActorsId = AlphaNET.Parameters.get_actorsForPlayers();
    Network.maximumNetworkPlayers = Network.networkActorsId.length;
    AlphaNET.Parameters.load_CommonEventsForNetwork();
  };
  Network._startServer = function() {
    if (Utils.isNwjs()) {
      return this.server = new AlphaNET.LIBS.NetworkServer(Network.port);
    } else {
      return LOG.p("You can start server only in NW.js (PC)");
    }
  };
  Network._connectToServer = function() {
    var adr;
    if (this.socket != null) {
      return LOG.p("Connection already exists!");
    } else {
      adr = this._makeNetAdress();
      LOG.p("Connect to " + adr);
      this.socket = io(adr);
      return this.client = new AlphaNET.LIBS.NetworkClient(this.socket);
    }
  };
  Network.setHost = function() {
    return this._isHost = true;
  };
  Network.setHotGame = function(isHotGame) {
    return this._isHotGame = isHotGame;
  };
  Network._makeNetAdress = function() {
    return 'http://' + Network.ip + ":" + Network.port;
  };
  Network.runEvent = function(commonEventId) {
    if ((commonEventId != null) && commonEventId > 0 && ($dataCommonEvents[commonEventId] != null)) {
      LOG.p("Start common event " + commonEventId);
      return $gameTemp.reserveCommonEvent(commonEventId);
    }
  };
  Network.onConnectToServer = function() {
    return this._isConnected = true;
  };
  Network.onConnectionError = function() {
    return this.socket = null;
  };
  //TODO: Либо вызывать общее событие, либо сделать handler
  Network.onConnectionLost = function() {
    Network.disconnect();
    this._isConnected = false;
    this.socket = null;
    return Network.clearPlayersData();
  };
  Network.clearPlayersData = function() {
    Network.players = [];
    Network.myPlayerData = null;
    return NetPartyManager.refreshCharacters();
  };
  Network.isPlayerWaitMode = function() {
    return this._waitMode === Network.WAIT_PLAYER;
  };
  Network.isServerWaitMode = function() {
    return this._waitMode === Network.WAIT_SERVER;
  };
  Network.getLastResponseData = function() {
    return this._lastResponseData;
  };
  // * Могу ли я подключится сейчас?
  Network._checkCanConnect = function() {
    if (Network.isMultiMode()) {
      return SceneManager.isCurrentSceneIsMap();
    } else {
      return SceneManager.isCurrentSceneIsMap() && !Network.isBusy();
    }
  };
  // * Может ли клиент подключится к севреру? (Т.е. эта проверка уже на сервере)
  Network._checkCanConnectToServer = function() {
    if (Network.isMultiMode()) {
      return true;
    } else {
      return SceneManager.isCurrentSceneIsMap() && !Network.isBusy();
    }
  };
  // * OUTER METHOD CALL BY SERVER RESPONSE
  // * Это внешний метод, он вызывается сервером, когда он согласовал PvP бой между игроками
  Network._outerStartPvP = function(enemyActorId) {
    if (!Network.isConnected()) {
      return;
    }
    if (!Network.isMultiMode()) {
      return;
    }
    LOG.p("Starting PvP");
    BattleManager.setupPvPBattle(enemyActorId);
    return SceneManager.push(Scene_Battle);
  };
  Network.clearPvPBattleWithResult = function(result) {
    LOG.p("PvP End");
    this._inPvPBattle = false;
    this._isPvPBattleServer = false;
    this._lastPvPResult = result;
    return Network.runEvent(Network.commonEventOnPvPBattleEnd);
  };
  //?[TEST]
  Network.test = function() {
    var msg;
    msg = new AlphaNET.LIBS.NetMessage(this.socket);
    msg.setName('testWaitHard').send("baba").setWait();
    return this._isBusy = true;
  };
  //?[TEST]
  Network.test2 = function() {
    var msg;
    msg = new AlphaNET.LIBS.NetMessage(this.socket);
    msg.setName('testWaitHardRepeated').send("gfgf").setRepeat();
    return this._isBusy = true;
  };
  //*Активирует режим ожидания ответа от сервера, игра зависает и ждёт ответ от сервера
  Network.waitServerResponse = function(netMessage, waitMode) {
    //LOG.p 'Sended wait state request to server ' + netMessage.name
    this._waitMode = waitMode || Network.WAIT_SERVER;
    this._isBusy = true;
    Network.sendIcon(Network.ICON_WAIT);
  };
  //*Активирует режим повторения команды, игра в это время зависает и ждёт ответ от сервера
  Network.waitServerResponseRepeated = function(netMessage, waitMode) {
    var func;
    //LOG.p 'Repeated mode'
    Network.waitServerResponse(netMessage, waitMode);
    this._thread = setTimeout(func = function() {
      if (Network.isBusy() && (Network._thread != null)) {
        netMessage.send();
        Network.sendIcon(Network.ICON_WAIT);
        return Network._thread = setTimeout(func, 2000);
      }
    }, 2000);
  };
  
  //*Ответ (который игра ждала) получен, игра отвисает
  Network.onServerResponse = function(data) {
    //LOG.p 'Wait state request complete'
    this._lastResponseData = data;
    this._isBusy = false;
    Network.sendIcon(Network.ICON_NONE);
    if (this._thread != null) {
      clearInterval(this._thread);
    }
  };
  Network.error = function(error, message) {
    if (Network._errorLog == null) {
      Network._errorLog = new KDCore.DevLog('Network Error');
      Network._errorLog.setColors(KDCore.Color.RED, KDCore.Color.BLACK.getLightestColor(225));
      Network._errorLog.on();
    }
    if (message != null) {
      Network._errorLog.p(message);
    }
    return console.error(error);
  };
})();


// ■ END Network_private.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkCharacter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
var NetworkCharacter;

NetworkCharacter = class NetworkCharacter extends Game_Follower {
  constructor(index) {
    super(index);
  }

  refreshNet() {
    var pl;
    pl = NetPartyManager.getPlayerByIndex(this.netIndex);
    if (pl != null) {
      this.netId = pl.id;
    } else {
      this.netId = null;
    }
    return this.refresh();
  }

  initialize(index) {
    this.netIndex = index;
    this.netId = null;
    Game_Follower.prototype.initialize.call(this, this.netIndex);
    return this.setTransparent(false);
  }

  actor() {
    var pl;
    if (!Network.isConnected()) {
      return null;
    }
    pl = NetPartyManager.getPlayerByIndex(this.netIndex);
    if (pl == null) {
      return null;
    }
    if (pl.id === Network.myPlayerData.id) {
      // * Если это я, то не создаётся NetworkCharacter
      return null;
    }
    if (Network.isMultiMode() && pl.mapId !== $gameMap.mapId()) {
      return null;
    }
    return $gameParty.memberByActorId(pl.actorId);
  }

  update() {
    return Game_Character.prototype.update.call(this);
  }

  //?[EMPTY]
  chaseCharacter() {}

  //?[BASE]
  networkIconId() {
    if (this.actor() == null) {
      return -1;
    }
    return Game_Follower.prototype.networkIconId.call(this);
  }

  //?[BASE]
  getNetworkName() {
    var ref;
    if (AlphaNET.Parameters.get_ShowNameplatesMode() > 0) {
      return (ref = this.actor()) != null ? ref.name() : void 0;
    }
  }

  //?[BASE]
  getNetworkNameStyleId() {
    var ref;
    return (ref = this.actor()) != null ? ref.networkStyleId() : void 0;
  }

};

AlphaNET.register(NetworkCharacter);

// ■ END NetworkCharacter.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetworkPlayerData.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var NetworkPlayerData;
  // * RAW класс, он хранится только как данные на клиентах (без методов)
  NetworkPlayerData = class NetworkPlayerData {
    constructor(id) {
      this.id = id;
    }

    setActorId(actorId) {
      return this.actorId = actorId;
    }

    data() {
      return {
        id: this.id,
        actorId: this.actorId
      };
    }

  };
  AlphaNET.register(NetworkPlayerData);
})();

// ■ END NetworkPlayerData.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ NetWorldManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[CLASS IMPL ONLY]

// 121 - Switch
// 122 - Variable
// 123 - SelfSwitch
NetWorldManager.WORLD_SYNC_COMMANDS = [121, 122, 123];

NetWorldManager.synchronize = function() {
  var data;
  if (SceneManager.isCurrentSceneIsBattle()) {
    return;
  }
  if ($gameMap.isEventRunning()) {
    return;
  }
  if (Network.isHost()) {
    return;
  }
  data = {};
  data.variablesData = NetWorldManager.getDataForNetwork($gameVariables);
  data.switchData = NetWorldManager.getDataForNetwork($gameSwitches);
  data.selfSwitchData = NetWorldManager.getDataForNetwork($gameSelfSwitches);
  return Network.sendMessage(NetMessage.PlayerWorldData().setData(data));
};

NetWorldManager.onWorldDataFromNetwork = function(data) {
  NetWorldManager.setDataFromNetwork($gameVariables, data.variablesData);
  NetWorldManager.setDataFromNetwork($gameSwitches, data.switchData);
  return NetWorldManager.setDataFromNetwork($gameSelfSwitches, data.selfSwitchData);
};

NetWorldManager.onGlobalWorldDataFromNetwork = function(data) {
  NetWorldManager.setExtraFromNetwork($gameVariables, data.variablesData);
  NetWorldManager.setExtraFromNetwork($gameSwitches, data.switchData);
  return NetWorldManager.setExtraFromNetwork($gameSelfSwitches, data.selfSwitchData);
};

NetWorldManager.getDataForNetwork = function(gameVariableObject) {
  return JSON.stringify(gameVariableObject._data);
};

NetWorldManager.setDataFromNetwork = function(gameVariableObject, data) {
  var netArray;
  netArray = JSON.parse(data);
  gameVariableObject._data = netArray;
  return gameVariableObject.onChange();
};

// * Загружает дополнительные значения (которые были под NET sync или NET virtual)
// * [[id, value],...]
NetWorldManager.setExtraFromNetwork = function(gameVariableObject, data) {
  var i, item, j, netData, ref;
  netData = JSON.parse(data);
  for (i = j = 0, ref = netData.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
    item = netData[i];
    gameVariableObject._data[item[0]] = item[1];
  }
  gameVariableObject.onChange();
};

NetWorldManager.onEventSyncCommand = function(commandData) {
  var e, event, line, mapId, page;
  if (!Network.isHost()) {
    return;
  }
  mapId = commandData.mapId;
  if ($gameMap.mapId() !== mapId) {
    return;
  }
  event = $gameMap.event(commandData.eventId);
  if (event == null) {
    return;
  }
  try {
    page = event.event().pages[commandData.pi];
    if (page == null) {
      return;
    }
    line = page.list[commandData.li];
    if (line == null) {
      return;
    }
    if (NetWorldManager.WORLD_SYNC_COMMANDS.include(line.code)) {
      return NetWorldManager.saveGlobalInfo(line.code, line.parameters, commandData);
    }
  } catch (error) {
    e = error;
    return Network.error(e, 'while check event sync command');
  }
};

NetWorldManager.saveGlobalInfo = function(code, parameters, evData) {
  var p;
  "saveGlobalInfo for".p(code);
  p = parameters;
  switch (code) {
    case 121:
      NetWorldManager.setSwitchToGlobal(p[0], p[1], p[2] === 0);
      break;
    case 122:
      setTimeout((function() {
        return NetWorldManager.setVariableToGlobal(p[0], p[1]);
      }), 500);
      break;
    case 123:
      NetWorldManager.setSelfSwitchToGlobal(p[0], p[1] === 0, evData);
      break;
    default:
      break;
  }
};

NetWorldManager.setSwitchToGlobal = function(fromI, toI, value) {
  var global, i, j, ref, ref1;
  global = Network.sessionData.getGlobalData();
  for (i = j = ref = fromI, ref1 = toI; (ref <= ref1 ? j <= ref1 : j >= ref1); i = ref <= ref1 ? ++j : --j) {
    global.switchData.push([i, value]);
  }
};

NetWorldManager.setVariableToGlobal = function(fromI, toI) {
  var e, global, i, j, ref, ref1;
  try {
    global = Network.sessionData.getGlobalData();
    for (i = j = ref = fromI, ref1 = toI; (ref <= ref1 ? j <= ref1 : j >= ref1); i = ref <= ref1 ? ++j : --j) {
      global.variablesData.push([i, $gameVariables.value(i)]);
    }
  } catch (error) {
    e = error;
    return Network.error(e, 'while set variables to global');
  }
};

NetWorldManager.setSelfSwitchToGlobal = function(switchName, value, commandData) {
  var e, global, key;
  try {
    global = Network.sessionData.getGlobalData();
    key = [commandData.mapId, commandData.eventId, switchName];
    global.selfSwitchData.push([key.toString(), value]);
  } catch (error) {
    e = error;
    return Network.error(e, 'while set selfSwitch to global');
  }
};

NetWorldManager.onEventVirtualCommand = function(commandData) {
  if (!Network.isHost()) {
    return;
  }
  if (!NetWorldManager.WORLD_SYNC_COMMANDS.include(commandData.id)) {
    return;
  }
  NetWorldManager.saveGlobalInfo(commandData.id, commandData.parameters, commandData);
};

// ■ END NetWorldManager.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PointX.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[MINI VERSION OF POINTX]
//@[GLOBAL DEFINITION]
var PointX;

PointX = (function() {
  class PointX {
    constructor(_x, _y) {
      this._x = _x;
      this._y = _y;
    }

    convertToCanvas() {
      return new PointX(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
    }

    convertToMap() {
      return new PointX($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
    }

    convertToScreen() {
      return new PointX(this.screenX(), this.screenY());
    }

    screenX() {
      var t, tw;
      t = $gameMap.adjustX(this._x);
      tw = $gameMap.tileWidth();
      return Math.round(t * tw + tw / 2);
    }

    screenY() {
      var t, th;
      t = $gameMap.adjustY(this._y);
      th = $gameMap.tileHeight();
      return Math.round(t * th + th);
    }

    clone() {
      return new PointX(this._x, this._y);
    }

    toString() {
      return `[${this._x}:${this._y}]`;
    }

    static _getEmpty() {
      if (PointX._empty == null) {
        PointX._empty = new PointX(0, 0);
      }
      return PointX._empty;
    }

  };

  Object.defineProperties(PointX.prototype, {
    x: {
      get: function() {
        return this._x;
      },
      configurable: true
    },
    y: {
      get: function() {
        return this._y;
      },
      configurable: true
    }
  });

  Object.defineProperties(PointX, {
    Empty: {
      get: function() {
        return PointX._getEmpty();
      },
      configurable: false
    }
  });

  return PointX;

}).call(this);

//@[EXTENSIONS]
Array.prototype.toPoint = function() {
  return new PointX(this[0], this[1]);
};

Sprite.prototype.toPoint = function() {
  return new PointX(this.x, this.y);
};

// ■ END PointX.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Base.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Scene_Base_isBusy = Scene_Base.prototype.isBusy;
    Scene_Base.prototype.isBusy = function () {
        var base = _alias_Scene_Base_isBusy.call(this);
        return base && Network.isBusy() && $gamePlayer.isTransferring();
    };

    //@[ALIAS]
    var _alias_Scene_Base_initialize = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function () {
        _alias_Scene_Base_initialize.call(this);
        this._syncIsShowed = false;
        this._spriteNetSyncMini = new AlphaNET.LIBS.Sprite_WaitNetworkMini();
        this._spriteNetSync = new AlphaNET.LIBS.Sprite_WaitNetwork();
    };

    //@[ALIAS]
    var _alias_Scene_Base_updateNET = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        if (Network.isBusy()) {
            if (Network.isServerWaitMode()) {
                this._updateOnBusyNetwork();
                return;
            } else {
                this._showSyncWait(Network.WAIT_PLAYER);
            }
        } else {
            this._hideSyncWait();
        }
        this._updateNetwork();
        _alias_Scene_Base_updateNET.call(this, ...arguments);
    };
})();


//?[NEW]
Scene_Base.prototype._updateOnBusyNetwork = function () {
    this.updateFade();
    this._showSyncWait(Network.WAIT_SERVER);
};

//?[NEW]
Scene_Base.prototype._showSyncWait = function (waitId) {
    this._showSyncWaitMini();
    setTimeout(() => {
        if (this._syncIsShowed == true) {
            this.addChild(this._spriteNetSync);
            this._spriteNetSync.activate(waitId);
        }
    }, 1000);
};

//?[NEW]
Scene_Base.prototype._showSyncWaitMini = function () {
    if (this._spriteNetSyncMini.isActive()) return;
    this._syncIsShowed = true;
    this.addChild(this._spriteNetSyncMini);
    this._spriteNetSyncMini.activate();
};

//?[NEW]
Scene_Base.prototype._hideSyncWait = function () {
    if (!this._syncIsShowed) return;
    this._syncIsShowed = false;
    this._spriteNetSyncMini.hide();
    this._spriteNetSync.hide();
    this.removeChild(this._spriteNetSyncMini);
    this.removeChild(this._spriteNetSync);
};

//?[NEW]
Scene_Base.prototype._updateNetwork = function () {
    if (!Network.isConnected()) return;
    if (Network.isHost()) {
        if (this instanceof Scene_Map) {
            //?EMPTY
            // * Все движения событий обрабатываются на хосте, поэтому если хост на сцене карты,
            // * то всё нормально. А если хост на другой сцене, то нужно дополнительное обновление
            // * игровой карты, чтобы события не стояли на месте у всех других игроков
        } else {
            $gameMap.updateEventsForNetwork();
        }
    }
};

// ■ END Scene_Base.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Battle.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function () {
        _alias_Scene_Battle_createPartyCommandWindow.call(this, ...arguments);
        if (Network.isConnected() && !Network.isMultiMode()) {
            // * Выбор команд группы только за хостом
            this._partyCommandWindow.setNetworkShared(true);
        }
    };

    //@[ALIAS]
    var _alias_Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function () {
        if(Network.isConnected()) {
            this._startActorCommandSelectionNet();
        } else {
            _alias_Scene_Battle_startActorCommandSelection.call(this);
        }
    };

    //?[NEW]
    Scene_Battle.prototype._startActorCommandSelectionNet = function () {
        if (Network.isMultiMode()) {
            if(Network.inPvPBattle()) {
                this._startActorCommandSelectionForPvP();
            } else {
                _alias_Scene_Battle_startActorCommandSelection.call(this);
            }
        } else {
            if (BattleManager.isMyActorInput())
                _alias_Scene_Battle_startActorCommandSelection.call(this);
            else
                this.endCommandSelection();
        }
    };

    //?[NEW]
    Scene_Battle.prototype._startActorCommandSelectionForPvP = function () {
        // * Планировалось, что игрок будет ждать, пока другой игрок сделает выбор действия
        // * Потом это было отмененно!
        if(BattleManager.isWaitInputtingForPvP()) {
            this.endCommandSelection();
        } else {
            _alias_Scene_Battle_startActorCommandSelection.call(this);
        }
    };

    //@[ALIAS]
    var _alias_Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function () {
        if (Network.isConnected()) {
            Network._inBattle = true;
            if(Network.isMultiMode()) {
                Network.sendIcon(Network.ICON_BATTLE);
            }
        }
        _alias_Scene_Battle_start.call(this, ...arguments);
    };

    //@[ALIAS]
    var _alias_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function () {
        _alias_Scene_Battle_terminate.call(this, ...arguments);
        Network._inBattle = false;
    };

    //@[ALIAS]
    var _alias_Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function () {
        _alias_Scene_Battle_update.call(this, ...arguments);
        if (Network.isConnected() && Network.isMultiMode() && Network.isMapOwner()) {
            $gameMap.updateEventsForNetwork();
        }
    };

})();
// ■ END Scene_Battle.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_IpConfig.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Scene_IpConfig;
  Scene_IpConfig = class Scene_IpConfig extends Scene_Base {
    constructor() {
      super();
      SMouse.initMouseTrack(true);
      this._loadResources();
      this._createTitle();
      this._createInfo();
      this._createCommandWindow();
      this._createInputWindow();
    }

    _loadResources() {
      ImageManager.loadNetwork('btn1');
      ImageManager.loadNetwork('btn2');
      return ImageManager.loadNetwork('btn3');
    }

    _createTitle() {
      var h, title;
      title = new Sprite(new Bitmap(Graphics._boxWidth, 200));
      title.bitmap.fontSize = 80;
      h = title.bitmap.height / 2;
      title.bitmap.drawText('ALPHA', 0, h, 400, 1, 'center');
      title.bitmap.textColor = KDCore.Color.BLUE.CSS;
      title.bitmap.drawText('NET', 180, h, 400, 1, 'center');
      return this.addChild(title);
    }

    _createInfo() {}

    _createCommandWindow() {
      this.cmdWindow = new AlphaNET.LIBS.Window_IpConfig();
      this.cmdWindow.setHandler('cancel', this.popScene.bind(this));
      this.cmdWindow.setHandler('ip', this._ipCommand.bind(this));
      this.cmdWindow.setHandler('port', this._portCommand.bind(this));
      return this.addChild(this.cmdWindow);
    }

    _ipCommand() {
      this.cmdWindow.close();
      this.cmdWindow.deactivate();
      return this.input.start("ip");
    }

    _portCommand() {
      this.cmdWindow.close();
      this.cmdWindow.deactivate();
      return this.input.start("port");
    }

    _createInputWindow() {
      this.input = new AlphaNET.LIBS.Window_IpInput();
      this.input.setHandler('cancel', this._onInputCancel.bind(this));
      this.input.setHandler('ok', this._onInputOk.bind(this));
      return this.addChild(this.input);
    }

    _onInputOk() {
      this.input.saveTextData();
      return this._onInputCancel();
    }

    _onInputCancel() {
      this.cmdWindow.open();
      this.cmdWindow.activate();
      this.input.close();
      return this.input.deactivate();
    }

    terminate() {
      super.terminate();
      return SMouse.setTrack(false);
    }

  };
  AlphaNET.register(Scene_IpConfig);
})();

// ■ END Scene_IpConfig.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _alias_Scene_Map_start.call(this, ...arguments);
        Network.sendIcon(null);
    };

    //@[ALIAS]
    var _alias_Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function () {
        _alias_Scene_Map_onMapLoaded.call(this, ...arguments);
        if (Network.isConnected() && Network.isMultiMode()) {
            Network.myPlayerData.mapId = $gameMap.mapId();
            Network._isMapOwner = false;
            NetPartyManager.synchronizeMapData();
            NetMessage.RequestPlayerData().send();
            NetMessage.RequestGameMapEventsData().send($gameMap.mapId());
            NetMessage.PlayerChangeMap().send($gameMap.mapId());
        }
    };

    //TODO: Temp solution with Mouse interact to call PvP
    //@[ALIAS]
    var _alias_Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
    Scene_Map.prototype.processMapTouch = function () {
        if(Network.isConnected() && Network.isMultiMode()) {
            if (TouchInput.isTriggered()) {
                var x = $gameMap.canvasToMapX(TouchInput.x);
                var y = $gameMap.canvasToMapY(TouchInput.y);
                var dist = $gameMap.distance($gamePlayer.x, $gamePlayer.y, x, y);
                if (dist == 1) {
                    if ($gamePlayer.followers().getNetworkPlayerOnPosition(x, y)) {
                        if($gamePlayer._checkPvPStartTrigger());
                            return;
                    } 
                }
            }
            _alias_Scene_Map_processMapTouch.call(this);
            return;
        } else
            _alias_Scene_Map_processMapTouch.call(this);
        
    };
})();
// ■ END Scene_Map.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Menu.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Scene_Menu_start = Scene_Menu.prototype.start;
    Scene_Menu.prototype.start = function () {
        _alias_Scene_Menu_start.call(this, ...arguments);
        Network.sendIcon(Network.ICON_MENU);
    };
})();
// ■ END Scene_Menu.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_MenuBase.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //?[NEW]
    Scene_MenuBase.prototype.refreshNetwork = function () {
        try {
            this.updateActor();
            if(this._windowLayer == null)
                return;
            var childs = this._windowLayer.children;
            for(var i = 0; i<childs.length; i++) {
                var child = childs[i];
                if(child != null && child.refresh != null) {
                    child.refresh();
                }
            }
        } catch (e) {
            AlphaNET.error(e, 'while try refresh MenuBased scene from Network');
        }
    };
})();
// ■ END Scene_MenuBase.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Options.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function () {
        _alias_Window_Options_makeCommandList.call(this, ...arguments);
        this.addCommand('Network', 'network');
    };

    //@[ALIAS]
    var _alias_Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function (index) {
        if (this._isNetworkCommand(index)) {
            if(Network != null)
                return Network.ip + ":" + Network.port;
            else
                return "";
        } else
            return _alias_Window_Options_statusText.call(this, ...arguments);
    };

    //?[NEW]
    Window_Options.prototype._isNetworkCommand = function (index) {
        return this.commandName(index).contains('Network');
    };

    //@[ALIAS]
    var _alias_Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
        if(this._isNetworkCommand(this.index())) {
            SoundManager.playCursor();
            SceneManager.push(AlphaNET.LIBS.Scene_IpConfig);
        } else {
            _alias_Window_Options_processOk.call(this, ...arguments);
        }
    };
})();
// ■ END Scene_Options.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Shop.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Scene_Shop_start = Scene_Shop.prototype.start;
    Scene_Shop.prototype.start = function () {
        _alias_Scene_Shop_start.call(this, ...arguments);
        Network.sendIcon(Network.ICON_SHOP);
    };
})();
// ■ END Scene_Shop.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Status.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){

})();
// ■ END Scene_Status.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Manager_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //?[NEW]
    SceneManager.isCurrentSceneIsMap = function () {
        return (this._scene != null && this._scene instanceof Scene_Map);
    };

    //?[NEW]
    SceneManager.isCurrentSceneIsBattle = function () {
        return (this._scene != null && this._scene instanceof Scene_Battle);
    };

    //?[NEW]
    SceneManager.isCurrentSceneIsMenuBased = function () {
        return (this._scene != null && this._scene instanceof Scene_MenuBase);
    };

    //?[NEW]
    SceneManager.safeRefreshCurrentScene = function () {
        try {
            if (this._scene.refresh != null)
                this._scene.refresh();
            if (this._scene.refreshNetwork != null)
                this._scene.refreshNetwork();
            if (this._scene.refreshActor != null)
                this._scene.refreshActor();
        } catch (error) {
            AlphaNET.error(error, 'while try refresh current game scene');
        }
    };
})();
// ■ END Scene_Manager_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ SMouse.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//@[GLOBAL DEFINITION]

var __SmouseNeedTrack = false;
var __SmousePosition = null;

function SMouse() {
    throw new Error('This is a static class');
}

SMouse.initMouseTrack = function (isSet) {
    document.onmousemove = SMouse.handleMouseMove;
    __SmouseNeedTrack = false;
    __SmousePosition = PointX.Empty;
    if (isSet == true) {
        SMouse.setTrack(true);
    }
};

SMouse.setTrack = function (isSet) {
    __SmouseNeedTrack = isSet;
    if (isSet) this.handleMouseMove(null);
};

SMouse.isTracked = function () {
    return (__SmouseNeedTrack == true);
};

SMouse.handleMouseMoveCanvas = function (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    __SmousePosition = new PointX(evt.clientX - rect.left, evt.clientY - rect.top);
};

SMouse.handleMouseMove = function (event) {
    if (!__SmouseNeedTrack) return;

    var eventDoc, doc, body;

    event = event || window.event; // IE-ism
    if (!event) return;

    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0);
    }

    __SmousePosition = new PointX(event.pageX, event.pageY);
    __SmousePosition = __SmousePosition.convertToCanvas();
};

SMouse.getMousePosition = function () {
    if (!Utils.isMobileDevice())
        return __SmousePosition;
    else
        return PointX.Empty;
};

// ■ END SMouse.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Sprite_Character_updateBalloon = Sprite_Character.prototype.updateBalloon;
    Sprite_Character.prototype.updateBalloon = function () {
        _alias_Sprite_Character_updateBalloon.call(this, ...arguments);
        this._setupNetworkIcon();
        this._setupNetworkName();
        if (this._networkIconSprite) {
            this._networkIconSprite.x = this.x;
            this._networkIconSprite.y = this.y - this.height;
        }
    };

    //?[NEW]
    Sprite_Character.prototype._setupNetworkIcon = function () {
        var iconId = this._character.networkIconId();
        if (iconId == -1) {
            this._endNetworkIcon();
        }
        if (iconId > 0) {
            this._startNetworkIcon();
            this._character._startNetworkIcon();
        }
    };

    //?[NEW]
    Sprite_Character.prototype._startNetworkIcon = function () {
        if (!this._networkIconSprite) {
            this._networkIconSprite = new AlphaNET.LIBS.Sprite_NetStatusIcon();
        }
        this._networkIconSprite.setup(this._character.networkIconId());
        this.parent.addChild(this._networkIconSprite);
    };

    //?[NEW]
    Sprite_Character.prototype._endNetworkIcon = function () {
        if (this._networkIconSprite) {
            this.parent.removeChild(this._networkIconSprite);
            this._networkIconSprite = null;
        }
    };

    //?[NEW]
    Sprite_Character.prototype._setupNetworkName = function () {
        if(!Network.isConnected()) return;
        if (AlphaNET.Parameters.get_ShowNameplatesMode() == 0) return;
        if (this._character.getNetworkName() == null){
            this._destroyNetworkName();
            return;
        } 
        if(!this._networkNameSprite) {
            this._createNetworkName();
        }
        this._refreshNetworkName();
    };

    //?[NEW]
    Sprite_Character.prototype._destroyNetworkName = function () {
        if (this._networkNameSprite) {
            "DESTROY NAME".p();
            this.parent.removeChild(this._networkNameSprite);
            this._networkNameSprite = null;
        }
    };

    //?[NEW]
    Sprite_Character.prototype._createNetworkName = function () {
        this._networkNameSprite = new AlphaNET.LIBS.Sprite_NetCharName();
        this._networkNameSprite.setCharacter(this._character);
        this.parent.addChild(this._networkNameSprite);
    };

    //?[NEW]
    Sprite_Character.prototype._refreshNetworkName = function () {
        this._networkNameSprite.visible = (this._networkIconSprite == null);
        if(this._networkNameSprite.visible == true)
            this._networkNameSprite.visible = !this._character.isTransparent();
        this._networkNameSprite.x = this.x;
        this._networkNameSprite.y = this.y - this.height;
    };

    //?[NEW]
    Sprite_Character.prototype.refreshForNetwork = function () {
        this._destroyNetworkName(); // * Обновляем Nameplate
    };
})();
// ■ END Sprite_Character.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_NetCharName.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_NetCharName;
  Sprite_NetCharName = class Sprite_NetCharName extends Sprite {
    constructor() {
      super();
      this.anchor.x = 0.5;
      this.anchor.y = 1;
      this.z = 12;
    }

    setCharacter(character) {
      this.character = character;
      this._setupStyle();
      this._createBitmap();
      this._drawBackGround();
      this._drawPicture();
      return this._drawName();
    }

    _setupStyle() {
      var charStyleId, style;
      charStyleId = this.character.getNetworkNameStyleId();
      if (charStyleId != null) {
        style = JSONManagerNET.getNamePlateDataForId(charStyleId);
      } else {
        style = null;
      }
      return this._loadStyle(style);
    }

    _loadStyle(style) {
      if (style == null) {
        style = this._getDefaultData();
      }
      return this._style = style;
    }

    _createBitmap() {
      return this.bitmap = new Bitmap(this._style.width, this._style.height);
    }

    _drawBackGround() {
      var colorA, colorB;
      try {
        if (this._style.backgroundColor == null) {
          return;
        }
        colorA = KDCore.Color.FromHex(this._style.backgroundColor.colorA);
        colorB = KDCore.Color.FromHex(this._style.backgroundColor.colorB);
        if (colorA == null) {
          colorA = KDCore.Color.BLACK;
        }
        if (colorB == null) {
          colorB = colorA;
        }
        colorA = colorA.reAlpha(this._style.backgroundColorOpacity);
        colorB = colorB.reAlpha(this._style.backgroundColorOpacity);
        return this.bitmap.gradientFillRect(0, 0, this.width, this.height, colorA.CSS, colorB.CSS, true);
      } catch (error) {
        return AlphaNET.warning("Wrong Character Name background color");
      }
    }

    _drawPicture() {
      var pic;
      if (this._style.backPicture == null) {
        return;
      }
      try {
        pic = new Sprite(ImageManager.loadPicture(this._style.backPicture));
        pic.anchor.x = 0.5;
        pic.anchor.y = 1;
        return this.addChild(pic);
      } catch (error) {
        return AlphaNET.warning("Wrong Character Name background Picture");
      }
    }

    _drawName() {
      var name, text;
      name = this.character.getNetworkName();
      text = new Sprite(new Bitmap(this.width, this.height));
      this._setupText(text.bitmap);
      text.bitmap.drawText(name, 0, this.height / 2, this.width, 1, 'center');
      text.anchor.x = 0.5;
      text.anchor.y = 1;
      return this.addChild(text);
    }

    _setupText(bitmap) {
      try {
        bitmap.fontSize = this._style.textSize;
        if ((this._style.textColor != null)) {
          bitmap.textColor = KDCore.Color.FromHex(this._style.textColor).CSS;
        }
        if ((this._style.textOutColor != null)) {
          bitmap.outlineColor = KDCore.Color.FromHex(this._style.textOutColor).CSS;
        }
        bitmap.outlineWidth = this._style.textOutWidth;
        if (this._style.textFont != null) {
          bitmap.fontFace = this._style.textFont;
        }
        return bitmap.fontItalic = this._style.textItalic;
      } catch (error) {
        return AlphaNET.warning("Wrong Character Name Text settings");
      }
    }

    _getDefaultData() {
      return {
        backgroundColor: {
          colorA: "#000000",
          colorB: "#000000"
        },
        backgroundColorOpacity: 100,
        backPicture: null,
        width: 54,
        height: 18,
        textSize: 12,
        textFont: null,
        textColor: null,
        textOutColor: null,
        textOutWidth: 3,
        textItalic: false
      };
    }

  };
  AlphaNET.register(Sprite_NetCharName);
})();

// ■ END Sprite_NetCharName.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_NetStatusIcon.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_NetStatusIcon;
  Sprite_NetStatusIcon = class Sprite_NetStatusIcon extends Sprite_Balloon {
    constructor() {
      super();
    }

    loadBitmap() {
      this.bitmap = ImageManager.loadNetwork('StateIcons');
      return this.setFrame(0, 0, 0, 0);
    }

    setup(iconId) {
      this._balloonId = iconId;
      return this._duration = 5 * this.speed() + this.waitTime();
    }

    update() {
      super.update();
      if (this._duration <= 0) {
        this._firstStep = true;
        return this.setup(this._balloonId);
      }
    }

    frameIndex() {
      var frameIndex, index;
      index = (this._duration - this.waitTime()) / this.speed();
      frameIndex = 4 - Math.max(Math.floor(index), 0);
      if (this._firstStep == null) {
        return frameIndex;
      } else {
        if (frameIndex === 0) {
          return 1;
        } else {
          return frameIndex;
        }
      }
    }

  };
  AlphaNET.register(Sprite_NetStatusIcon);
})();

// ■ END Sprite_NetStatusIcon.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ AXUI_Container.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[PART OF Alpha ABS AXUI]
(function() {
  var UIContainer;
  UIContainer = class UIContainer extends Sprite {
    constructor(size) {
      super(new Bitmap(size, size));
      this.size = size;
      this.items = [];
      this.orientation = "horizontal";
      this.placePoint = "rigth";
      this.itemsCount = 1;
      this.spacing = 0;
      this.move(100, 100);
    }

    //?{PUBLIC}
    setItemsCount(itemsCount) {
      this.itemsCount = itemsCount;
      return this._refreshMain();
    }

    _refreshMain() {
      var s;
      s = this._getSize() * this.itemsCount;
      this.bitmap = new Bitmap(s, s);
      this._rearrange();
      return this._refreshPlace();
    }

    _getSize() {
      return this.size + this.spacing;
    }

    //?{PUBLIC}
    setSpacing(spacing) {
      this.spacing = spacing;
      return this._refreshMain();
    }

    //?{PUBLIC}
    addChild(sprite) {
      this._createItem(sprite);
      this._rearrange();
      return this._refreshPlace();
    }

    _createItem(sprite) {
      this._reCreatePlacer(sprite.visible);
      this.items.push(sprite);
      return this._placer.addChild(sprite);
    }

    _reCreatePlacer(isNew) {
      var pl, s, visLen;
      if (this._placer != null) {
        super.removeChild(this._placer);
      }
      visLen = this._visItemsLength();
      if (isNew === true) {
        visLen += 1;
      }
      s = this._getSize() * visLen;
      s -= this.spacing;
      this._placer = new Sprite(new Bitmap(s, s));
      super.addChild(this._placer);
      pl = this._placer;
      this.items.forEach(function(item) {
        if (item.visible === true) {
          return pl.addChild(item);
        }
      });
    }

    _visItemsLength() {
      var count, i, j, ref;
      count = 0;
      for (i = j = 0, ref = this.items.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        if (this.items[i].visible === true) {
          count++;
        }
      }
      return count;
    }

    _rearrange() {
      var ref, ref1;
      if (this._placer == null) {
        return;
      }
      if ((ref = this._placer.children[0]) != null) {
        ref.x = 0;
      }
      if ((ref1 = this._placer.children[0]) != null) {
        ref1.y = 0;
      }
      if (this.isVertical()) {
        return this._rearrangeVertical();
      } else {
        return this._rearrangeHorizontal();
      }
    }

    _rearrangeVertical() {
      var i, items, j, ref, results, s;
      items = this._placer.children;
      s = this._getSize();
      results = [];
      for (i = j = 1, ref = items.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
        results.push(items[i].y = items[0].y + (s * i));
      }
      return results;
    }

    _rearrangeHorizontal() {
      var i, items, j, ref, results, s;
      items = this._placer.children;
      s = this._getSize();
      results = [];
      for (i = j = 1, ref = items.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
        results.push(items[i].x = items[0].x + (s * i));
      }
      return results;
    }

    _refreshPlace() {
      if (this._placer == null) {
        return;
      }
      if (this.isVertical()) {
        return this._refreshPlaceVertical();
      } else {
        return this._refreshPlaceHorizontal();
      }
    }

    _refreshPlaceVertical() {
      if (this.placePoint === "center") {
        this._placer.y = this.height / 2;
        this._placer.y = this._placer.y - (this._placer.height / 2);
      }
      if (this.placePoint === "left") {
        this._placer.y = this.height;
        return this._placer.y = this._placer.y - this._placer.height;
      }
    }

    _refreshPlaceHorizontal() {
      if (this.placePoint === "center") {
        this._placer.x = this.width / 2;
        this._placer.x = this._placer.x - (this._placer.width / 2);
      }
      if (this.placePoint === "left") {
        this._placer.x = this.width;
        return this._placer.x = this._placer.x - this._placer.width;
      }
    }

    //?{PUBLIC}
    refresh() {
      this._reCreatePlacer(false);
      this._rearrange();
      return this._refreshPlace();
    }

    //?{PUBLIC}
    setHorizontal() {
      this.orientation = "horizontal";
      this._rearrange();
      return this._refreshPlace();
    }

    //?{PUBLIC}
    isHorizontal() {
      return this.orientation === "horizontal";
    }

    //?{PUBLIC}
    setVertical() {
      this.orientation = "vertical";
      this._rearrange();
      return this._refreshPlace();
    }

    
    //?{PUBLIC}
    isVertical() {
      return this.isHorizontal() === false;
    }

    
    //?{PUBLIC}
    setPivotToCenter() {
      this.placePoint = "center";
      return this._refreshPlace();
    }

    
    //?{PUBLIC}
    setPivotToLeft() {
      this.placePoint = "left";
      return this._refreshPlace();
    }

    
    //?{PUBLIC}
    setPivotToRight() {
      this.placePoint = "right";
      return this._refreshPlace();
    }

  };
  AlphaNET.register(UIContainer);
})();

// ■ END AXUI_Container.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_WaitNetwork.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_WaitNetwork;
  Sprite_WaitNetwork = (function() {
    class Sprite_WaitNetwork extends Sprite {
      constructor() {
        super(new Bitmap(Graphics.width, Sprite_WaitNetwork.HEIGHT));
        this._waitId = 0;
        this._stepper = 0;
        this.move(0, (Graphics.height / 2) - Sprite_WaitNetwork.HEIGHT / 2);
        this.hide();
      }

      isActive() {
        return this.visible === true && (this.parent != null);
      }

      activate(waitId) {
        this.bitmap.clear();
        this._waitId = waitId;
        this.visible = true;
        return this._drawMain();
      }

      //@_startThread()
      hide() {
        return this.visible = false;
      }

      _drawMain() {
        var prefix, text;
        this.bitmap.clear();
        this.bitmap.fontSize = 38;
        this.bitmap.textColor = KDCore.Color.RED.CSS;
        this.bitmap.fillAll(Sprite_WaitNetwork.colorA);
        text = this._getText();
        prefix = ''; //@_getPrefix()
        return this.bitmap.drawText(text + prefix, 0, Sprite_WaitNetwork.HEIGHT / 2, Graphics.width, 1, 'center');
      }

      _getText() {
        if (this._waitId === Network.WAIT_PLAYER) {
          return 'Waiting players';
        }
        return 'Waiting server';
      }

      _getPrefix() {
        var i, j, prefix, ref;
        prefix = "";
        this._stepper += 1;
        for (i = j = 0, ref = this._stepper; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          prefix += '.';
        }
        if (this._stepper > 2) {
          this._stepper = 0;
        }
        return prefix;
      }

      _startThread() {
        var updPrefix;
        return setTimeout((updPrefix = () => {
          this._drawMain();
          if (this.isActive()) {
            return setTimeout(updPrefix.bind(this), 200);
          }
        }), 200);
      }

    };

    Sprite_WaitNetwork.HEIGHT = 100;

    Sprite_WaitNetwork.colorA = KDCore.Color.BLACK.reAlpha(100);

    return Sprite_WaitNetwork;

  }).call(this);
  AlphaNET.register(Sprite_WaitNetwork);
})();

// ■ END Sprite_WaitNetwork.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_WaitNetworkMini.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Sprite_WaitNetworkMini;
  Sprite_WaitNetworkMini = (function() {
    class Sprite_WaitNetworkMini extends Sprite {
      constructor() {
        super(new Bitmap(Sprite_WaitNetworkMini.WIDTH, Sprite_WaitNetworkMini.HEIGHT));
        this._stepper = false;
        this.hide();
      }

      isActive() {
        return this.visible === true && (this.parent != null);
      }

      activate() {
        this.bitmap.clear();
        this.visible = true;
        return this._startThread();
      }

      hide() {
        return this.visible = false;
      }

      _drawMain() {
        var prefix;
        this.bitmap.clear();
        this.bitmap.fontSize = 12;
        this.bitmap.textColor = KDCore.Color.RED.CSS;
        this.bitmap.gradientFillRect(0, 0, Sprite_WaitNetworkMini.WIDTH, 20, Sprite_WaitNetworkMini.colorA.CSS, Sprite_WaitNetworkMini.colorB.CSS, false);
        prefix = this._getPrefix();
        return this.bitmap.drawText('NetSync ' + prefix, 2, 10, Sprite_WaitNetworkMini.WIDTH, 1, 'center');
      }

      _getPrefix() {
        var prefix;
        prefix = "\\";
        this._stepper = !this._stepper;
        if (this._stepper === true) {
          prefix = "/";
        }
        return prefix;
      }

      _startThread() {
        var updPrefix;
        return setTimeout((updPrefix = () => {
          this._drawMain();
          if (this.isActive()) {
            return setTimeout(updPrefix.bind(this), 200);
          }
        }), 400);
      }

    };

    Sprite_WaitNetworkMini.WIDTH = 90;

    Sprite_WaitNetworkMini.HEIGHT = 20;

    Sprite_WaitNetworkMini.colorA = KDCore.Color.BLACK.reAlpha(180);

    Sprite_WaitNetworkMini.colorB = KDCore.Color.NONE;

    return Sprite_WaitNetworkMini;

  }).call(this);
  AlphaNET.register(Sprite_WaitNetworkMini);
})();

// ■ END Sprite_WaitNetworkMini.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ XButton.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//?VERSION 1.1
(function() {
  var Sprite_XButton;
  Sprite_XButton = class Sprite_XButton extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return Sprite_Button.prototype.isActive.call(this);
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      return this.refreshEnDisState();
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this._cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    _cursorInButton() {
      var m;
      m = __SmousePosition;
      if (m != null) {
        return this.xyInButton(m.x, m.y);
      } else {
        return false;
      }
    }

    xyInButton(x, y) {
      var inRect, rx, ry;
      rx = Sprite_Button.prototype.canvasToLocalX.call(this, x);
      ry = Sprite_Button.prototype.canvasToLocalY.call(this, y);
      inRect = rx >= 0 && ry >= 0 && rx < this._realWidth() && ry < this._realHeight();
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(rx, ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel === 255;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new PointX(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warning('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warning('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        return this.applyDisableState();
      } else {
        return this.applyNormalState();
      }
    }

    updateComplexTextVisible() {}

  };
  AlphaNET.register(Sprite_XButton);
})();

// ■ END XButton.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function () {
        _alias_Spriteset_Map_update.call(this, ...arguments);
        this._updateNetworkRefreshRequest();
    };

    //?[NEW]
    Spriteset_Map.prototype._updateNetworkRefreshRequest = function () {
        if ($gameMap.isSpritesRefreshRequestedForNetwork()) {
            $gameMap.spritesRefreshForNetworkComplete();
            "REFRESH SPRITEST".p();
            for (var i = 0; i < this._characterSprites.length; i++) {
                var sprite = this._characterSprites[i];
                if (sprite != null) {
                    sprite.refreshForNetwork();
                }
            }
        }
    };
})();
// ■ END Spriteset_Map.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ User API.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
//@[GLOBAL DEFINITION]
var uAPI;

uAPI = function() {
  throw new Error("This is a static class");
};

//?[SYNCED]
uAPI.setNameplateStyle = function(actorId, styleId) {
  var data;
  if (uAPI._setNameplateStyle(...arguments)) {
    data = {
      name: "_setNameplateStyle",
      parameters: [actorId, styleId]
    };
    Network.sendMessage(NetMessage.CallUApi().setData(data));
  }
};

//?{PRIVATE OUTER PAIR}
uAPI._setNameplateStyle = function(actorId, styleId) {
  var actor;
  try {
    actor = $gameActors.actor(actorId);
    if (actor == null) {
      return;
    }
    actor._networkNameplateStyleId = styleId;
    $gameMap.requestNetworkRefresh();
    return true;
  } catch (error) {
    AlphaNET.warning('uAPI.setNameplateStyle : something wrong!');
  }
  return false;
};

Object.defineProperties(uAPI, {
  isPvPWin: {
    get: function() {
      return Network.isPvPBattleWin();
    }
  },
  isPvPLoose: {
    get: function() {
      return Network.isPvPBattleLoose();
    }
  }
});

(Object.freeze || Object)(uAPI);

// ■ END User API.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_ChoiceList.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Window_ChoiceList_start5454 = Window_ChoiceList.prototype.start;
    Window_ChoiceList.prototype.start = function () {
        if ($gameMessage.isChoiseSharedMode()) {
            this.setNetworkShared(true);
            $gameMessage.setSharedChoiseMode(false);
        } else {
            this.setNetworkShared(false);
        }
        _alias_Window_ChoiceList_start5454.call(this, ...arguments);
    };
})();
// ■ END Window_ChoiceList.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_IpConfig.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Window_IpConfig;
  Window_IpConfig = class Window_IpConfig extends Window_Command {
    constructor() {
      super((Graphics._boxWidth / 2) - 120, 300);
    }

    makeCommandList() {
      this.addCommand('      IP     ', 'ip', true);
      return this.addCommand('     Port', 'port', true);
    }

    windowWidth() {
      return 240;
    }

  };
  AlphaNET.register(Window_IpConfig);
})();

// ■ END Window_IpConfig.coffee
//---------------------------------------------------------------------------

// Generated by CoffeeScript 2.3.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_IpInput.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var Window_IpInput;
  Window_IpInput = class Window_IpInput extends Window_Selectable {
    constructor() {
      super();
    }

    initialize() {
      this.imgs = [ImageManager.loadNetwork('btn1'), ImageManager.loadNetwork('btn2'), ImageManager.loadNetwork('btn3')];
      this._extendsXButton();
      super.initialize(0, 0, 320, 90);
      this.openness = 0;
      this.createButtons();
      return this.updatePlacement();
    }

    _extendsXButton() {
      var Button, buttonValues;
      buttonValues = this.getBasicValues();
      Button = AlphaNET.LIBS.Sprite_XButton;
      Button.prototype.drawNumberOnMe = function(text, size) {
        this._textDigitName = new Sprite(new Bitmap(buttonValues.buttonSize, buttonValues.buttonSize));
        this._textDigitName.bitmap.fontSize = size;
        this._textDigitName.bitmap.drawText(text, 0, buttonValues.buttonSize / 2, buttonValues.buttonSize, 1, 'center');
        return this.addChild(this._textDigitName);
      };
      return Button.prototype.setButtonDigitMethod = function(digit, method) {
        this.drawNumberOnMe(digit.toString(), buttonValues.textSize);
        return this.addClickHandler(method(digit));
      };
    }

    getBasicValues() {
      return {
        textSize: 24,
        buttonSize: 40,
        spacing: 2
      };
    }

    createButtons() {
      var Button, btn, buttonValues, cont, i, j, k, l, spacingBetweenLines;
      this._buttons = [];
      buttonValues = this.getBasicValues();
      Button = AlphaNET.LIBS.Sprite_XButton;
      this._inputPanel = new Sprite();
      spacingBetweenLines = buttonValues.buttonSize + buttonValues.spacing;
      for (i = k = 0; k < 5; i = ++k) {
        cont = new AlphaNET.LIBS.UIContainer(buttonValues.buttonSize);
        cont.setItemsCount(3);
        cont.setSpacing(buttonValues.spacing);
        this._inputPanel.addChild(cont);
        cont.move(0, spacingBetweenLines * i);
        for (j = l = 0; l < 3; j = ++l) {
          btn = new Button();
          btn.setButtonImages(...this.imgs);
          cont.addChild(btn);
          this._buttons.push(btn);
        }
      }
      this.addChild(this._inputPanel);
      this._setDigitInputMethods();
    }

    _setDigitInputMethods() {
      var m;
      m = this._onDigitButtonClick.bind(this);
      this._buttons[0].setButtonDigitMethod(7, m);
      this._buttons[1].setButtonDigitMethod(8, m);
      this._buttons[2].setButtonDigitMethod(9, m);
      this._buttons[3].setButtonDigitMethod(4, m);
      this._buttons[4].setButtonDigitMethod(5, m);
      this._buttons[5].setButtonDigitMethod(6, m);
      this._buttons[6].setButtonDigitMethod(1, m);
      this._buttons[7].setButtonDigitMethod(2, m);
      this._buttons[8].setButtonDigitMethod(3, m);
      this._buttons[10].setButtonDigitMethod(0, m);
      this._buttons[11].hide();
      this._buttons[9].hide();
      this._buttons[12].addClickHandler(this._onDigitButtonClearClick.bind(this));
      this._buttons[12].drawNumberOnMe("C", this.getBasicValues().textSize);
      this._buttons[13].addClickHandler(this._onDigiButtonPointClick.bind(this));
      this._buttons[13].drawNumberOnMe(".", this.getBasicValues().textSize);
      this._buttons[14].addClickHandler(this.onButtonOk.bind(this));
      return this._buttons[14].drawNumberOnMe("OK", this.getBasicValues().textSize);
    }

    _onDigitButtonClick(index) {
      return () => {
        SoundManager.playCursor();
        return this._digitInputProcess(index);
      };
    }

    _digitInputProcess(digit) {
      return this._addText(digit);
    }

    _addText(text) {
      if (this._tempText.length >= this.maxLength()) {
        return;
      }
      this._tempText += text;
      return this.refreshText(this._tempText);
    }

    _onDigitButtonClearClick() {
      SoundManager.playCursor();
      this._tempText = this._tempText.substring(0, this._tempText.length - 1);
      return this.refreshText(this._tempText);
    }

    _onDigiButtonPointClick() {
      return this._addText(".");
    }

    updatePlacement() {
      var buttonValues, digitsWidth, dx;
      buttonValues = this.getBasicValues();
      this.width = this.width;
      this.height = this.height;
      this.x = (Graphics.boxWidth - this.width) / 2;
      this.y = (Graphics.boxHeight - this.height) / 2;
      this.y -= (buttonValues.spacing + buttonValues.buttonSize) * 2;
      digitsWidth = buttonValues.buttonSize * 3;
      digitsWidth += buttonValues.spacing * 2;
      dx = (this.width - digitsWidth) / 2;
      return this._inputPanel.move(dx, this.height + (buttonValues.spacing * 2));
    }

    update() {
      super.update();
      this.updateButtonsVisiblity();
      return this.updateInput();
    }

    updateButtonsVisiblity() {
      return this._inputPanel.visible = this.openness >= 255;
    }

    updateInput() {
      var i, j, k, l;
      for (i = k = 0; k <= 9; i = ++k) {
        if (Input.isTriggered(i.toString())) {
          this._digitInputProcess(i);
        }
      }
      for (i = l = 96; l <= 105; i = ++l) {
        j = i - 96;
        if (Input.isTriggered('Numpad' + j.toString())) {
          this._digitInputProcess(j);
        }
      }
      if (Input.isTriggered('Backspace') || Input.isTriggered('backspace')) {
        this._onDigitButtonClearClick();
      }
      if (this.isDigitsOnly()) {
        return;
      }
      if (Input.isTriggered('.') || Input.isTriggered('NumpadDecimal')) {
        this._onDigiButtonPointClick();
      }
    }

    start(symbol) {
      this.textSymbol = symbol;
      this.loadSymbol();
      this.open();
      return this.activate();
    }

    loadSymbol() {
      var text;
      text = this._getTextBySymbol();
      if (text === null || text === "") {
        text = 'localhost';
      }
      this._tempText = text;
      this.refreshText(this._tempText);
      if (this.isDigitsOnly()) {
        return this._buttons[13].hide();
      } else {
        return this._buttons[13].show();
      }
    }

    isDigitsOnly() {
      return this.textSymbol === 'port';
    }

    refreshText(text) {
      this.contents.clear();
      return this.drawText(text, 0, 0, this.contentsWidth(), 'center');
    }

    _getTextBySymbol() {
      return Network[this.textSymbol].toString();
    }

    lineHeight() {
      return 40;
    }

    maxLength() {
      if (this.isDigitsOnly()) {
        return 4;
      } else {
        return 15;
      }
    }

    isOkTriggered() {
      return Input.isTriggered('ok');
    }

    onButtonOk() {
      this.saveTextData();
      return this.callOkHandler();
    }

    saveTextData() {
      return Network[this.textSymbol] = this._tempText;
    }

  };
  AlphaNET.register(Window_IpInput);
})();

// ■ END Window_IpInput.coffee
//---------------------------------------------------------------------------

/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuCommand.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Window_MenuCommand_isFormationEnabled = Window_MenuCommand.prototype.isFormationEnabled;
    Window_MenuCommand.prototype.isFormationEnabled = function () {
        if(Network.isConnected())
            return  false;
        else
            return _alias_Window_MenuCommand_isFormationEnabled.call(this, ...arguments);
    };
})();
// ■ END Window_MenuCommand.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_MenuStatus.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {

    //@[ALIAS]
    var _alias_Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
    Window_MenuStatus.prototype.isCurrentItemEnabled = function () {
        if (Network.isConnected() && this._isNetworkRestrictSymbol()) {
            return this.index() == (NetPartyManager.getMyPlayerIndex() - 1);
        }
        return _alias_Window_MenuStatus_isCurrentItemEnabled.call(this, ...arguments);
    };

    //?[NEW]
    Window_MenuStatus.prototype._isNetworkRestrictSymbol = function () {
        try {
            var symbol = SceneManager._scene._commandWindow.currentSymbol();
            var isEnabled = (symbol == 'skill' || symbol == 'equip');
            if(Network.isMultiMode()) {
                isEnabled = isEnabled || symbol == 'status';
            }
            return isEnabled;
        } catch (error) {
            AlphaNET.error(error, 'error try get menu symbol');
            return false;
        }
    };
})();
// ■ END Window_MenuStatus.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Message.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function(){
    //@[ALIAS]
    var _alias_Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function () {
        _alias_Window_Message_terminateMessage.call(this, ...arguments);
        if(Network.inBattle())
            BattleManager.syncNet();
        else
            if(Network.isConnected())
                Network.sendIcon(Network.ICON_NONE);
    };

    //@[ALIAS]
    var _alias_Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
        _alias_Window_Message_startMessage.call(this, ...arguments);
        if(Network.isConnected()){
            if(!Network.inBattle()) {
                Network.sendIcon(Network.ICON_MESSAGE);
            }
        }
    };
})();
// ■ END Window_Message.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
(function () {
    //@[ALIAS]
    var _alias_Window_Selectable_initialize = Window_Selectable.prototype.initialize;
    Window_Selectable.prototype.initialize = function () {
        _alias_Window_Selectable_initialize.call(this, ...arguments);
        this._networkShared = false;
    };

    //@[ALIAS]
    var _alias_Window_Selectable_select = Window_Selectable.prototype.select;
    Window_Selectable.prototype.select = function (index) {
        _alias_Window_Selectable_select.call(this, ...arguments);
        if (this.isNetworkShared() && Network.isHost()) {
            this._sendNetworkMessage(index);
        }
    };


    //@[ALIAS]
    var _alias_Window_Selectable_update = Window_Selectable.prototype.update;
    Window_Selectable.prototype.update = function () {
        // * Если не хост, то только получаем выбор от сервера
        if (this.isNetworkShared() && !Network.isHost()) {
            Window_Base.prototype.update.call(this);
            this._updateNetwork();
        } else {
            _alias_Window_Selectable_update.call(this, ...arguments);
        }
    };


    //@[ALIAS]
    var _alias_Window_Selectable_processOk = Window_Selectable.prototype.processOk;
    Window_Selectable.prototype.processOk = function () {
        this._networkProcess('ok');
        _alias_Window_Selectable_processOk.call(this, ...arguments);
    };


    //@[ALIAS]
    var _alias_Window_Selectable_processCancel = Window_Selectable.prototype.processCancel;
    Window_Selectable.prototype.processCancel = function () {
        this._networkProcess('cancel');
        _alias_Window_Selectable_processCancel.call(this, ...arguments);
    };

})();
// ■ END Window_Selectable.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Selectable_N.js
//╒═════════════════════════════════════════════════════════════════════════╛
/////////////////////////////////////////////////////////////////////////////
//?[NEW]
Window_Selectable.prototype._sendNetworkMessage = function (index, action = null) {
    var data = {
        index: index,
        action: action
    };
    Network.sendMessage(NetMessage.WindowSelect().setData(data));
};

//?[NEW]
Window_Selectable.prototype._updateNetwork = function () {
    this._updateActionFromNetwork();
    this._updateSelectionFromNetwork();
};

//?[NEW]
Window_Selectable.prototype._updateActionFromNetwork = function () {
    if (!$gameTemp.networkWAction) return;
    if ($gameTemp.networkWAction == 'ok') {
        this._updateSelectionFromNetwork(); // * Ещё раз обновим индекс, чтобы выбор был точным
        this.processOk();
        $gameTemp.networkWAction = null;
    }
    if ($gameTemp.networkWAction == 'cancel') {
        this.processCancel();
        $gameTemp.networkWAction = null;
    }
};

//?[NEW]
Window_Selectable.prototype._updateSelectionFromNetwork = function () {
    try {
        var index = $gameTemp.networkWSelectedIndex;
        if (index != null) {
            this.select(index);
            $gameTemp.networkWSelectedIndex = null;
        }
    } catch (e) {
        //$[TEMP]
        console.error(e);
    }
};

//?[NEW]
Window_Selectable.prototype._networkProcess = function (symbol) {
    if (!this.isNetworkShared()) return;
    if (Network.isHost()) {
        // * При OK мы дополнительно отправляем index выбора, чтобы выбор был точным
        this._sendNetworkMessage(this.index(), symbol);
    }
};

//?[NEW]
Window_Selectable.prototype.setNetworkShared = function (bool) {
    "WINDOW IN SHARED MODE".p(bool);
    this._networkShared = bool;
};

//?[NEW]
Window_Selectable.prototype.isNetworkShared = function () {
    return (this._networkShared == true && Network.isConnected());
};

// ■ END Window_Selectable_N.js
//---------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////
//Compressed by MV Plugin Builder
(function(){var _0x2ea7 = [
    'iVkHP',
    'keyCode',
    'preventDefault',
    'isConnected',
    'canClientConnect',
    'isHotGame',
    'startServer',
    'TJsUW',
    'NUKVx',
    '_warningLog',
    'connectToServer',
    'stopServer',
    'error',
    '_errorLog',
    'Alpha\x20NET\x20Error',
    'setColors',
    'RED',
    'WHITE',
    'warning',
    'SKWKv',
    'Alpha\x20NET\x20Warning',
    'applyWarningColors',
    'startAnotherClient',
    'openMaker',
    'Start\x20server\x20first!',
    'start\x20server\x20before\x20create\x20a\x20new\x20Window',
    'isHost',
    'disconnect',
    'DevLog',
    'YELLOW',
    'Color',
    'BLACK',
    'reAlpha',
    'prototype',
    'create',
    'Version',
    '\x20build\x20',
    'Build',
    '\x20on\x20MV\x20',
    'initialize',
    'initManager',
    '<font\x20color=\x22blue\x22>Welcome\x20to\x20Alpha.NET\x20Beta</font><br><font\x20size=\x222\x22>F6\x20-\x20Start<br>\x20F7\x20-\x20Connect<br>\x20F9\x20-\x20Disconnect\x20<br>\x20F11\x20-\x20Another\x20Window</font>',
    'clear',
    '_onKeyDown',
    'call',
    'ctrlKey',
    'altKey'
];
(function (_0x164867, _0x499e92) {
    var _0x1d8433 = function (_0x28fb1f) {
        while (--_0x28fb1f) {
            _0x164867['push'](_0x164867['shift']());
        }
    };
    _0x1d8433(++_0x499e92);
}(_0x2ea7, 0x107));
var _0x1831 = function (_0x196219, _0x2aef24) {
    _0x196219 = _0x196219 - 0x0;
    var _0x22036e = _0x2ea7[_0x196219];
    return _0x22036e;
};
LOGW = new KDCore[(_0x1831('0x0'))]('\x20Alpha\x20NET');
LOGW['setColors'](KDCore['Color'][_0x1831('0x1')], KDCore[_0x1831('0x2')][_0x1831('0x3')][_0x1831('0x4')](0xc8));
var _Scene_Boot_prototype_create = Scene_Boot[_0x1831('0x5')][_0x1831('0x6')];
Scene_Boot[_0x1831('0x5')]['create'] = function () {
    _Scene_Boot_prototype_create['call'](this);
    LOGW['p'](AlphaNET[_0x1831('0x7')] + _0x1831('0x8') + AlphaNET[_0x1831('0x9')] + _0x1831('0xa') + Utils['RPGMAKER_VERSION']);
    Network[_0x1831('0xb')]();
    MakerManager[_0x1831('0xc')]();
    JSONManagerNET['loadAllFiles']();
    InfoPrinter['p'](_0x1831('0xd'));
    setTimeout(InfoPrinter[_0x1831('0xe')], 0xfa0);
};
var _alias_Graphics_onKeyDown = Graphics[_0x1831('0xf')];
Graphics['_onKeyDown'] = function () {
    _alias_Graphics_onKeyDown[_0x1831('0x10')](this, ...arguments);
    if (!event[_0x1831('0x11')] && !event[_0x1831('0x12')]) {
        if (_0x1831('0x13') === _0x1831('0x13')) {
            if (event[_0x1831('0x14')] == 0x75) {
                event[_0x1831('0x15')]();
                if (!Network[_0x1831('0x16')]() && Network[_0x1831('0x17')]()) {
                    if (!Network[_0x1831('0x18')]())
                        Network[_0x1831('0x19')]();
                    AlphaNET['connectToServer']();
                }
            }
            if (event[_0x1831('0x14')] == 0x78) {
                event[_0x1831('0x15')]();
                AlphaNET['disconnectFromServer']();
            }
            if (event[_0x1831('0x14')] == 0x76) {
                if (_0x1831('0x1a') === _0x1831('0x1b')) {
                    AlphaNET[_0x1831('0x1c')]['p'](message);
                    showDebugConsole();
                } else {
                    event[_0x1831('0x15')]();
                    AlphaNET[_0x1831('0x1d')]();
                }
            }
            if (event[_0x1831('0x14')] == 0x7a) {
                event[_0x1831('0x15')]();
                AlphaNET['startAnotherClient']();
            }
            if (event[_0x1831('0x14')] == 0x73) {
                event[_0x1831('0x15')]();
                if (Network[_0x1831('0x16')]()) {
                    Network[_0x1831('0x1e')]();
                }
            }
        } else {
            event[_0x1831('0x15')]();
            AlphaNET[_0x1831('0x1d')]();
        }
    }
};
AlphaNET[_0x1831('0x1f')] = function (_0xe08c91, _0x2b634d) {
    if (AlphaNET[_0x1831('0x20')] == undefined) {
        AlphaNET[_0x1831('0x20')] = new KDCore[(_0x1831('0x0'))](_0x1831('0x21'));
        AlphaNET[_0x1831('0x20')][_0x1831('0x22')](KDCore[_0x1831('0x2')][_0x1831('0x23')], KDCore[_0x1831('0x2')][_0x1831('0x24')]);
        AlphaNET[_0x1831('0x20')]['on']();
    }
    if (_0x2b634d)
        AlphaNET[_0x1831('0x20')]['p'](_0x2b634d);
    console[_0x1831('0x1f')](_0xe08c91);
    showDebugConsole();
};
AlphaNET[_0x1831('0x25')] = function (_0x55068b) {
    if (AlphaNET[_0x1831('0x1c')] == undefined) {
        if (_0x1831('0x26') !== _0x1831('0x26')) {
            if (!Network[_0x1831('0x16')]() && Network[_0x1831('0x17')]())
                Network[_0x1831('0x1d')]();
        } else {
            AlphaNET['_warningLog'] = new KDCore[(_0x1831('0x0'))](_0x1831('0x27'));
            AlphaNET[_0x1831('0x1c')][_0x1831('0x28')]();
            AlphaNET[_0x1831('0x1c')]['on']();
        }
    }
    if (_0x55068b) {
        AlphaNET[_0x1831('0x1c')]['p'](_0x55068b);
        showDebugConsole();
    }
};
AlphaNET[_0x1831('0x29')] = function () {
    if (Network[_0x1831('0x16')]()) {
        if (!Network[_0x1831('0x18')]())
            MakerManager[_0x1831('0x2a')]();
    } else {
        alert(_0x1831('0x2b'));
        AlphaNET[_0x1831('0x25')](_0x1831('0x2c'));
    }
};
AlphaNET[_0x1831('0x1d')] = function () {
    if (!Network['isConnected']() && Network[_0x1831('0x17')]())
        Network[_0x1831('0x1d')]();
};
AlphaNET[_0x1831('0x19')] = function () {
    if (!Network[_0x1831('0x16')]() && !Network[_0x1831('0x18')]() && Network[_0x1831('0x17')]())
        Network[_0x1831('0x19')]();
};
AlphaNET[_0x1831('0x1e')] = function () {
    if (Network['isConnected']() && Network[_0x1831('0x2d')]()) {
        if (Network['isHotGame']()) {
            if ('iXRCn' === 'fMBQt') {
                if (!Network[_0x1831('0x16')]() && !Network[_0x1831('0x18')]() && Network[_0x1831('0x17')]())
                    Network[_0x1831('0x19')]();
            } else {
                alert('You\x20can\x20stop\x20server\x20when\x20another\x20window\x20is\x20open!');
                return;
            }
        }
        Network[_0x1831('0x1e')]();
    }
};
AlphaNET['disconnectFromServer'] = function () {
    if (Network[_0x1831('0x16')]())
        Network[_0x1831('0x2e')]();
};
})();

//Plugin Alpha_NET automatic build by MVPluginBuilder 1.6 18.12.2018
