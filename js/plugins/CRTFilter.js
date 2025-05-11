/*:
 * @target MZ
 * @plugindesc Adds a CRT screen effect to the entire game: map, menu, battle, title, windows, etc.
 * @help Applies a retro CRT effect by using a full-screen filter on all main scenes and UI layers.
 */

(() => {
  const crtFilter = new PIXI.Filter(null, `
    precision mediump float;
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;

    float rand(vec2 co){
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vTextureCoord;
      vec4 color = texture2D(uSampler, uv);

      // Scanlines
      float scanline = sin(uv.y * 800.0) * 0.05;
      color.rgb -= scanline;

      // Vignette
      float vignette = smoothstep(0.95, 0.2, length(uv - 0.5));
      color.rgb *= vignette;

      // Noise
      float noise = rand(uv + fract(sin(uv * 1000.0)));
      color.rgb += noise * 0.02;

      gl_FragColor = color;
    }
  `);

  function applyCRTFilterToScene(scene) {
    if (!scene) return;
    const filters = scene.filters || [];
    if (!filters.includes(crtFilter)) {
      filters.push(crtFilter);
      scene.filters = filters;
    }
  }

  const _Scene_Base_start = Scene_Base.prototype.start;
  Scene_Base.prototype.start = function () {
    _Scene_Base_start.call(this);
    applyCRTFilterToScene(this); // Nakłada CRT na całą scenę, łącznie z oknami
  };
})();
