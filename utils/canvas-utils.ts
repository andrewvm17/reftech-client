/**
 * Canvas coordinate utility functions
 * These functions handle conversion between screen coordinates and normalized coordinates
 */

type Point = {
  x: number
  y: number
}

/**
 * Converts absolute pixel coordinates to normalized coordinates (0-1)
 * @param point The absolute pixel coordinates
 * @param canvasWidth The width of the canvas in pixels
 * @param canvasHeight The height of the canvas in pixels
 * @returns Normalized coordinates between 0 and 1
 */
export function calculateRelativePosition(
  point: Point,
  canvasWidth: number,
  canvasHeight: number
): Point {
  return {
    x: point.x / canvasWidth,
    y: point.y / canvasHeight
  }
}

/**
 * Converts normalized coordinates (0-1) to absolute pixel coordinates
 * @param point The normalized coordinates (0-1)
 * @param canvasWidth The width of the canvas in pixels
 * @param canvasHeight The height of the canvas in pixels
 * @returns Absolute pixel coordinates
 */
export function calculateAbsolutePosition(
  point: Point,
  canvasWidth: number,
  canvasHeight: number
): Point {
  return {
    x: point.x * canvasWidth,
    y: point.y * canvasHeight
  }
} 