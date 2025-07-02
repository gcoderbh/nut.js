// Clean provider interfaces for standalone compilation
import { Key, Button, Point, Region, Image } from "./shared-types";

export interface KeyboardProviderInterface {
  pressKey(key: Key): Promise<void>;
  releaseKey(key: Key): Promise<void>;
  pressMultipleKeys(keys: Key[]): Promise<void>;
  releaseMultipleKeys(keys: Key[]): Promise<void>;
  type(text: string): Promise<void>;
  click(...keys: Key[]): Promise<void>;
}

export interface MouseProviderInterface {
  setMousePosition(point: Point): Promise<void>;
  getMousePosition(): Promise<Point>;
  leftClick(): Promise<void>;
  rightClick(): Promise<void>;
  middleClick(): Promise<void>;
  scrollDown(amount: number): Promise<void>;
  scrollUp(amount: number): Promise<void>;
  scrollLeft(amount: number): Promise<void>;
  scrollRight(amount: number): Promise<void>;
  drag(start: Point, end: Point): Promise<void>;
  pressButton(button: Button): Promise<void>;
  releaseButton(button: Button): Promise<void>;
}

export interface ScreenProviderInterface {
  grabScreen(): Promise<Image>;
  grabScreenRegion(region: Region): Promise<Image>;
  highlight(region: Region, duration?: number, opacity?: number): Promise<void>;
  screenWidth(): Promise<number>;
  screenHeight(): Promise<number>;
  screenSize(): Promise<Region>;
}

export interface WindowProviderInterface {
  getWindows(): Promise<number[]>;
  getActiveWindow(): Promise<number>;
  getWindowRegion(windowHandle: number): Promise<Region>;
  getWindowTitle(windowHandle: number): Promise<string>;
  focusWindow(windowHandle: number): Promise<boolean>;
}
