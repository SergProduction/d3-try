/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

eval("const d3 = __webpack_require__(1);\n\nlet createMap = (x,y) => {\n  let map = [];\n  for (let ym=0; ym < y; ym++) {\n    map.push([])\n    for (let xm=0; xm < y; xm++) {\n      map[ym].push(0)\n    }\n  }\n  return map\n}\n\nlet createCommet = (map) => {\n  let yLen = map.length\n  let xLen = map[0].length\n  return (quantity) => {\n    for(let i=0; i<quantity; i++){\n      let x = Math.floor( Math.random() * xLen)\n      let y = Math.floor( Math.random() * yLen)\n      map[y][x] = 1\n    }\n  }\n}\n\nlet createPlayer = (map) => {\n  let yLen = map.length\n  let xLen = map[0].length\n  let x = Math.floor( Math.random() * xLen)\n  let y = Math.floor( Math.random() * yLen)\n  map[y][x] = 5\n  return {x,y}\n}\n\n\nlet movePlayer = (coordPlayer, direct) => {\n  /*\n  [7,8,9]\n  [4, ,6]\n  [1,2,3]\n  */\n  if(!direct){\n    direct = Math.floor( Math.random() * 9 )\n    direct = direct == 5 || direct == 0 ? 9 : direct\n  }\n\n  map[coordPlayer.y][coordPlayer.x] = 0\n  switch(direct){\n    case 8:\n      map[coordPlayer.y-=1][coordPlayer.x] = 5\n      break\n    case 9:\n      map[coordPlayer.y-=1][coordPlayer.x+=1] = 5\n      break\n    case 6:\n      map[coordPlayer.y][coordPlayer.x+=1] = 5\n      break\n    case 3:\n      map[coordPlayer.y+=1][coordPlayer.x+=1] = 5\n      break\n    case 2:\n      map[coordPlayer.y+=1][coordPlayer.x] = 5\n      break\n    case 1:\n      map[coordPlayer.y+=1][coordPlayer.x-=1] = 5\n      break\n    case 4:\n      map[coordPlayer.y][coordPlayer.x-=1] = 5\n      break\n    case 7:\n      map[coordPlayer.y-=1][coordPlayer.x-=1] = 5\n      break\n    default:\n      console.log('tryPlayer')\n      break\n  }\n  return coordPlayer\n}\n\n\nvar svgContainer = d3.select(\"body\")\n                      .append(\"svg\")\n                      .attr(\"width\", 500)\n                      .attr(\"height\", 500)\n                      .style('border', '1px solid');\n\nlet createScen = (map, size) => {\n  let yLen = map.length\n  let xLen = map[0].length\n\n  let cellAdd = (x,y, color) => {\n    svgContainer\n    .append(\"rect\")\n    .attr(\"fill\", color)\n    .attr(\"stroke\", '#000')\n    .attr(\"x\", x)\n    .attr(\"y\", y)\n    .attr(\"width\", size)\n    .attr(\"height\", size);\n  }\n\n  return () => {\n    for(let ym=0; ym<yLen; ym++){\n      for(let xm=0; xm<xLen; xm++){\n        switch(map[ym][xm]){\n          case 0:\n            cellAdd(size*xm, size*ym, '#ddd')\n          break\n          case 1:\n            cellAdd(size*xm, size*ym, '#f88')\n          break\n          case 5:\n            cellAdd(size*xm, size*ym, '#555')\n          break\n          default:\n            console.log('tryRender', map[ym][xm])\n          break\n        }\n      }\n    }\n  }\n}\n\nlet map = createMap(20,20)\n\ncreateCommet(map)(30)\n\ncoordPlayer = createPlayer(map)\n\nlet render = createScen(map, 25)\n\nconst play = setInterval(() => {\n  coordPlayer = movePlayer(coordPlayer)\n  render()\n  console.log('tic')\n}, 1000)\n\nsetTimeout(() => {\n  clearInterval(play)\n},30*1000)\n\nconsole.log(map)\n\nlet Brain = () => {\n  let memmory = []\n  return () => {}\n}\n\nlet serg = Brain()\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9pbmRleC5qcz8yNjQ1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBLGtCQUFrQixRQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGQzID0gcmVxdWlyZSgnZDMnKTtcblxubGV0IGNyZWF0ZU1hcCA9ICh4LHkpID0+IHtcbiAgbGV0IG1hcCA9IFtdO1xuICBmb3IgKGxldCB5bT0wOyB5bSA8IHk7IHltKyspIHtcbiAgICBtYXAucHVzaChbXSlcbiAgICBmb3IgKGxldCB4bT0wOyB4bSA8IHk7IHhtKyspIHtcbiAgICAgIG1hcFt5bV0ucHVzaCgwKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbWFwXG59XG5cbmxldCBjcmVhdGVDb21tZXQgPSAobWFwKSA9PiB7XG4gIGxldCB5TGVuID0gbWFwLmxlbmd0aFxuICBsZXQgeExlbiA9IG1hcFswXS5sZW5ndGhcbiAgcmV0dXJuIChxdWFudGl0eSkgPT4ge1xuICAgIGZvcihsZXQgaT0wOyBpPHF1YW50aXR5OyBpKyspe1xuICAgICAgbGV0IHggPSBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogeExlbilcbiAgICAgIGxldCB5ID0gTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIHlMZW4pXG4gICAgICBtYXBbeV1beF0gPSAxXG4gICAgfVxuICB9XG59XG5cbmxldCBjcmVhdGVQbGF5ZXIgPSAobWFwKSA9PiB7XG4gIGxldCB5TGVuID0gbWFwLmxlbmd0aFxuICBsZXQgeExlbiA9IG1hcFswXS5sZW5ndGhcbiAgbGV0IHggPSBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogeExlbilcbiAgbGV0IHkgPSBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogeUxlbilcbiAgbWFwW3ldW3hdID0gNVxuICByZXR1cm4ge3gseX1cbn1cblxuXG5sZXQgbW92ZVBsYXllciA9IChjb29yZFBsYXllciwgZGlyZWN0KSA9PiB7XG4gIC8qXG4gIFs3LDgsOV1cbiAgWzQsICw2XVxuICBbMSwyLDNdXG4gICovXG4gIGlmKCFkaXJlY3Qpe1xuICAgIGRpcmVjdCA9IE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiA5IClcbiAgICBkaXJlY3QgPSBkaXJlY3QgPT0gNSB8fCBkaXJlY3QgPT0gMCA/IDkgOiBkaXJlY3RcbiAgfVxuXG4gIG1hcFtjb29yZFBsYXllci55XVtjb29yZFBsYXllci54XSA9IDBcbiAgc3dpdGNoKGRpcmVjdCl7XG4gICAgY2FzZSA4OlxuICAgICAgbWFwW2Nvb3JkUGxheWVyLnktPTFdW2Nvb3JkUGxheWVyLnhdID0gNVxuICAgICAgYnJlYWtcbiAgICBjYXNlIDk6XG4gICAgICBtYXBbY29vcmRQbGF5ZXIueS09MV1bY29vcmRQbGF5ZXIueCs9MV0gPSA1XG4gICAgICBicmVha1xuICAgIGNhc2UgNjpcbiAgICAgIG1hcFtjb29yZFBsYXllci55XVtjb29yZFBsYXllci54Kz0xXSA9IDVcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAzOlxuICAgICAgbWFwW2Nvb3JkUGxheWVyLnkrPTFdW2Nvb3JkUGxheWVyLngrPTFdID0gNVxuICAgICAgYnJlYWtcbiAgICBjYXNlIDI6XG4gICAgICBtYXBbY29vcmRQbGF5ZXIueSs9MV1bY29vcmRQbGF5ZXIueF0gPSA1XG4gICAgICBicmVha1xuICAgIGNhc2UgMTpcbiAgICAgIG1hcFtjb29yZFBsYXllci55Kz0xXVtjb29yZFBsYXllci54LT0xXSA9IDVcbiAgICAgIGJyZWFrXG4gICAgY2FzZSA0OlxuICAgICAgbWFwW2Nvb3JkUGxheWVyLnldW2Nvb3JkUGxheWVyLngtPTFdID0gNVxuICAgICAgYnJlYWtcbiAgICBjYXNlIDc6XG4gICAgICBtYXBbY29vcmRQbGF5ZXIueS09MV1bY29vcmRQbGF5ZXIueC09MV0gPSA1XG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBjb25zb2xlLmxvZygndHJ5UGxheWVyJylcbiAgICAgIGJyZWFrXG4gIH1cbiAgcmV0dXJuIGNvb3JkUGxheWVyXG59XG5cblxudmFyIHN2Z0NvbnRhaW5lciA9IGQzLnNlbGVjdChcImJvZHlcIilcbiAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCA1MDApXG4gICAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgNTAwKVxuICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnYm9yZGVyJywgJzFweCBzb2xpZCcpO1xuXG5sZXQgY3JlYXRlU2NlbiA9IChtYXAsIHNpemUpID0+IHtcbiAgbGV0IHlMZW4gPSBtYXAubGVuZ3RoXG4gIGxldCB4TGVuID0gbWFwWzBdLmxlbmd0aFxuXG4gIGxldCBjZWxsQWRkID0gKHgseSwgY29sb3IpID0+IHtcbiAgICBzdmdDb250YWluZXJcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBjb2xvcilcbiAgICAuYXR0cihcInN0cm9rZVwiLCAnIzAwMCcpXG4gICAgLmF0dHIoXCJ4XCIsIHgpXG4gICAgLmF0dHIoXCJ5XCIsIHkpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCBzaXplKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIHNpemUpO1xuICB9XG5cbiAgcmV0dXJuICgpID0+IHtcbiAgICBmb3IobGV0IHltPTA7IHltPHlMZW47IHltKyspe1xuICAgICAgZm9yKGxldCB4bT0wOyB4bTx4TGVuOyB4bSsrKXtcbiAgICAgICAgc3dpdGNoKG1hcFt5bV1beG1dKXtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjZWxsQWRkKHNpemUqeG0sIHNpemUqeW0sICcjZGRkJylcbiAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNlbGxBZGQoc2l6ZSp4bSwgc2l6ZSp5bSwgJyNmODgnKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgY2VsbEFkZChzaXplKnhtLCBzaXplKnltLCAnIzU1NScpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyeVJlbmRlcicsIG1hcFt5bV1beG1dKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubGV0IG1hcCA9IGNyZWF0ZU1hcCgyMCwyMClcblxuY3JlYXRlQ29tbWV0KG1hcCkoMzApXG5cbmNvb3JkUGxheWVyID0gY3JlYXRlUGxheWVyKG1hcClcblxubGV0IHJlbmRlciA9IGNyZWF0ZVNjZW4obWFwLCAyNSlcblxuY29uc3QgcGxheSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgY29vcmRQbGF5ZXIgPSBtb3ZlUGxheWVyKGNvb3JkUGxheWVyKVxuICByZW5kZXIoKVxuICBjb25zb2xlLmxvZygndGljJylcbn0sIDEwMDApXG5cbnNldFRpbWVvdXQoKCkgPT4ge1xuICBjbGVhckludGVydmFsKHBsYXkpXG59LDMwKjEwMDApXG5cbmNvbnNvbGUubG9nKG1hcClcblxubGV0IEJyYWluID0gKCkgPT4ge1xuICBsZXQgbWVtbW9yeSA9IFtdXG4gIHJldHVybiAoKSA9PiB7fVxufVxuXG5sZXQgc2VyZyA9IEJyYWluKClcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);