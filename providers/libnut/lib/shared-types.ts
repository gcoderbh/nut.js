// Clean shared types for standalone compilation
export enum Key {
  Escape,
  F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12,
  F13, F14, F15, F16, F17, F18, F19, F20, F21, F22, F23, F24,
  Print, ScrollLock, Pause,
  Grave, Num1, Num2, Num3, Num4, Num5, Num6, Num7, Num8, Num9, Num0,
  Minus, Equal, Backspace,
  Insert, Home, PageUp, NumLock, Divide, Multiply, Subtract,
  Tab, Q, W, E, R, T, Y, U, I, O, P, LeftBracket, RightBracket, Backslash,
  Delete, End, PageDown,
  NumPad7, NumPad8, NumPad9, Add,
  CapsLock, A, S, D, F, G, H, J, K, L, Semicolon, Quote, Return,
  NumPad4, NumPad5, NumPad6,
  LeftShift, Z, X, C, V, B, N, M, Comma, Period, Slash, RightShift,
  Up, NumPad1, NumPad2, NumPad3, Enter,
  LeftControl, LeftSuper, LeftWin, LeftCmd, LeftAlt, Space, 
  RightAlt, RightSuper, RightWin, RightCmd, Menu, RightControl, Fn,
  Left, Down, Right,
  NumPad0, Decimal, Clear,
  AudioMute, AudioVolDown, AudioVolUp, AudioPlay, AudioStop, 
  AudioPause, AudioPrev, AudioNext, AudioRewind, AudioForward, 
  AudioRepeat, AudioRandom,
}

export enum Button {
  LEFT = "left",
  MIDDLE = "middle", 
  RIGHT = "right"
}

export class Point {
  constructor(public x: number, public y: number) {}
}

export class Size {
  constructor(public width: number, public height: number) {}
}

export class Region {
  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number
  ) {}
}

export enum ColorMode {
  RGB = "RGB",
  RGBA = "RGBA",
  BGR = "BGR"
}

export class Image {
  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly data: any,
    public readonly channels: number,
    public readonly id: string,
    public readonly bitsPerPixel: number,
    public readonly byteWidth: number,
    public readonly colorMode: ColorMode = ColorMode.BGR,
    public readonly pixelDensity: { scaleX: number; scaleY: number } = {
      scaleX: 1.0,
      scaleY: 1.0,
    }
  ) {
    if (channels <= 0) {
      throw new Error("Channel <= 0");
    }
  }

  public get hasAlphaChannel() {
    return this.channels > 3;
  }
}
