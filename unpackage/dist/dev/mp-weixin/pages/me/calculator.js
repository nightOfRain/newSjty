(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/me/calculator"],{

/***/ 145:
/*!*****************************************************************************************!*\
  !*** /Users/wenjieliu/Desktop/兴业银行2021/bsxt/main.js?{"page":"pages%2Fme%2Fcalculator"} ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _calculator = _interopRequireDefault(__webpack_require__(/*! ./pages/me/calculator.vue */ 146));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_calculator.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 146:
/*!**********************************************************************!*\
  !*** /Users/wenjieliu/Desktop/兴业银行2021/bsxt/pages/me/calculator.vue ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calculator_vue_vue_type_template_id_d4d970a0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator.vue?vue&type=template&id=d4d970a0& */ 147);
/* harmony import */ var _calculator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculator.vue?vue&type=script&lang=js& */ 149);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _calculator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _calculator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs




/* normalize component */

var component = Object(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _calculator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _calculator_vue_vue_type_template_id_d4d970a0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _calculator_vue_vue_type_template_id_d4d970a0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _calculator_vue_vue_type_template_id_d4d970a0___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/me/calculator.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 147:
/*!*****************************************************************************************************!*\
  !*** /Users/wenjieliu/Desktop/兴业银行2021/bsxt/pages/me/calculator.vue?vue&type=template&id=d4d970a0& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calculator_vue_vue_type_template_id_d4d970a0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./calculator.vue?vue&type=template&id=d4d970a0& */ 148);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calculator_vue_vue_type_template_id_d4d970a0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calculator_vue_vue_type_template_id_d4d970a0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calculator_vue_vue_type_template_id_d4d970a0___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calculator_vue_vue_type_template_id_d4d970a0___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 148:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/wenjieliu/Desktop/兴业银行2021/bsxt/pages/me/calculator.vue?vue&type=template&id=d4d970a0& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 149:
/*!***********************************************************************************************!*\
  !*** /Users/wenjieliu/Desktop/兴业银行2021/bsxt/pages/me/calculator.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calculator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./calculator.vue?vue&type=script&lang=js& */ 150);
/* harmony import */ var _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calculator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calculator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calculator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calculator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_Applications_HBuilderX_app_Contents_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_calculator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 150:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!/Users/wenjieliu/Desktop/兴业银行2021/bsxt/pages/me/calculator.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _this2 = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      lvPicker: ['固定利息', 'LPR'],
      lvIndex: -1,
      hkPicker: ['等额本息', '等额本金'],
      hkIndex: -1,
      loanamt: '',
      term: '',
      per: '',
      float_s: 0,
      per_result: '',
      mylv: [],
      myyg: [],
      mybj: [] };


  },
  methods: {
    formSubmit: function formSubmit(e) {
      var _this = this;
      console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e));
    },
    /**
        * @param {Object} e
        * 选择利率类型 0-传统利率 1-LPR利率
        */
    lvPickerChange: function lvPickerChange(e) {
      console.log("lvPickerChange:" + e.detail.value);
      this.lvIndex = e.detail.value;
    },
    /**
        * @param {Object} e
        * 选择还款方式 0-等额本息 1-等额本金
        */
    hkPickerChange: function hkPickerChange(e) {
      console.log("hkPickerChange:" + e.detail.value);
      this.hkIndex = e.detail.value;
    },
    /**
        * @param {Object} e
        * 贷款金额
        */
    loanAmtInput: function loanAmtInput(e) {
      this.loanamt = e.detail.value;
    },
    /**
        * @param {Object} e
        * 贷款期限
        */
    termInput: function termInput(e) {
      this.term = e.detail.value;
    },
    /**
        * @param {Object} e
        * 贷款基准利率
        */
    perInput: function perInput(e) {
      this.per = e.detail.value;
    },
    /**
        * @param {Object} e
        * 浮动比例或LPR基点
        */
    floatSInput: function floatSInput(e) {
      this.float_s = e.detail.value;
    },
    /**
        * 
        * 计算实际贷款利率
        */
    updateLv: function updateLv() {
      var sum = 0.000;
      if (this.isEmpty(this.per)) {
        return;
      }
      if (this.lvIndex == 0) {
        sum = (parseFloat(this.per) * (1 + parseFloat(this.float_s) / 100)).toFixed(2);
      } else {
        sum = (parseFloat(this.per) + parseFloat(this.float_s) / 100).toFixed(2);
      }

      this.per_result = parseFloat(sum);
      //$("#per_result").val(per+'% + '+float_sd+'‱ = '+sum);

    },
    isEmpty: function isEmpty(obj) {

      if (!obj || obj == 0 || obj == '' || obj == 'null' || obj == 'undefined') {
        return true;
      }

      if (Array.prototype.isPrototypeOf(obj) && obj.length == 0) {
        return true;
      }

      return false;
    },
    //等额本金
    get_result_bj: function get_result_bj(flag) {
      var yg = 0.00; //月供

      var bj_total = 0.00; //已归还本金
      var lx_total = 0.00; //总利息
      var months = 0;;

      var amt = 0.00;

      var per = 0.00;
      var float_p = 0.00;

      per = this.per_result / 1200;
      months = this.term * 12.0;
      amt = this.loanamt * 10000.00;

      var mylx = []; //每月应还利息
      var myyg = []; //月供
      var mybj = []; //本金

      var bj = amt / months; //每月应还本金

      for (var i = 0; i < months; i++) {
        var yg_tmp = bj + (amt - bj_total) * per;
        var lx_tmp = (amt - bj_total) * per;

        mylx.push(lx_tmp.toFixed(2));
        myyg.push(yg_tmp.toFixed(2));
        mybj.push(bj.toFixed(2));

        bj_total += bj;
        lx_total += lx_tmp;
      }

      this.mylx = mylx;
      this.myyg = myyg;
      this.mybj = mybj;
      this.bj_total = bj_total.toFixed(2);
      this.lx_total = lx_total.toFixed(2);
    },

    //等额本息
    get_result_bx: function get_result_bx(flag) {
      var yg = 0.00; //月供	
      var months = 0;;
      var amt = 0.00;
      var per = 0.00;
      var bj_total = 0.00; //已归还本金
      var lx_total = 0.00; //总利息

      per = this.per_result / 1200;
      months = this.term * 12.0;
      amt = this.loanamt * 10000.00;

      var mylx = []; //每月应还利息
      var myyg = []; //月供
      var mybj = []; //本金

      yg = amt * per * cifang(1 + per, months) / (cifang(1 + per, months) - 1);

      for (var i = 0; i < months; i++) {
        var lx_tmp = amt * per * (cifang(1 + per, months) - cifang(1 + per, i)) / (cifang(1 + per, months) - 1.0);
        var bj_tmp = amt * per * cifang(1 + per, i) / (cifang(1 + per, months) - 1.0);

        mylx.push(lx_tmp.toFixed(2));
        myyg.push(yg.toFixed(2));
        mybj.push(bj_tmp.toFixed(2));

        bj_total += bj_tmp;
        lx_total += lx_tmp;
      }
      this.mylx = mylx;
      this.myyg = myyg;
      this.mybj = mybj;
      this.bj_total = bj_total.toFixed(2);
      this.lx_total = lx_total.toFixed(2);

    },

    get_result: function get_result() {


      if (this.isEmpty(this.loanamt)) {
        console.log("贷款金额不能为空");
        return;
      }
      if (this.isEmpty(this.term)) {
        console.log("贷款期限不能为空");
        return;
      }
      if (this.isEmpty(this.per)) {
        console.log("贷款利率不能为空");
        return;
      }


      if (this.hkIndex == '0') {
        this.get_result_bj();
      } else {
        this.get_result_bx();
      }


      console.log("======mylx:" + JSON.stringify(this.mylv));
      console.log("======myyg:" + JSON.stringify(this.myyg));
      console.log("======mybj:" + JSON.stringify(this.mybj));



      // 		$("#p2").html('');
      // 		var p2_html = '<div class="mui-row"><div class="mui-col-xs-2 mui-center">月份</div><div class="mui-col-xs-3 mui-center">月供(元)</div><div class="mui-col-xs-3 mui-center">本金(元)</div><div class="mui-col-xs-3 mui-center">利息(元)</div></div>';
      // 		 var lx_total = 0.00;
      // 		 var amt = 0.00;
      // 		 var months = 0;
      // 		if(loan_type == '1'){
      // 			months = $("#term_gjj").val()*12.0;
      // 		}else{
      // 			months = $("#term").val()*12.0;
      // 		}
      // 		 for(var i = 0 ; i < months; i++ ){
      // 			var tmp_yg = parseFloat(myyg[i])+parseFloat(myyg_gjj[i]);
      // 			var tmp_lx = parseFloat(mylx[i])+parseFloat(mylx_gjj[i]);
      // 			var tmp_bj = parseFloat(mybj[i])+parseFloat(mybj_gjj[i]);

      // 			lx_total += tmp_lx;
      // 			amt += tmp_yg;
      // 			p2_html += '<div class="mui-row"><div class="mui-col-xs-2 mui-center">'+(i+1)+'月</div><div class="mui-col-xs-3 mui-center">¥'+tmp_yg.toFixed(2)+'</div><div class="mui-col-xs-3 mui-center">¥'+tmp_bj.toFixed(2)+'</div><div class="mui-col-xs-3 mui-center" >¥'+tmp_lx.toFixed(2)+'</div></div>';
      // 		 }



      // 		$("#p2").append(p2_html+'<div class="mui-col-xs-12">利息总额：¥'+lx_total.toFixed(2)+'(元)</div><div class="mui-col-xs-12">还款总额：¥'+amt.toFixed(2)+'(元)</div>')
      // 		$("#lx_total").val(lx_total.toFixed(2));
      // 		$("#amt_total").val(amt.toFixed(2));



      // 			//发送报文给后台用于计数
      // 		var groupid = localStorage.getItem("groupid");

      // 		if(groupid == '2' && top.Settings.loginState){ //合作机构用户
      // 			var data = {};

      // 			data.type = '1';
      // 			data.accessToken = localStorage.getItem("accessToken");
      // 			$.ajax({
      // 				type : "post",
      // 				timeout: 2000,
      // 				url: "http://"+top.comm_url+"/app/6067",
      // 				data : data,
      // 				datatype : "application/json",
      // 				success : function(msg){}
      // 			});
      // 		}
    },
    cifang: function cifang(val, times) {
      var result_val = 1.00;

      for (var i = 0; i < times; i++) {
        result_val *= val;
      }

      return result_val;
    } },

  onLoad: function onLoad(options) {
    var _this = _this2;

  } };exports.default = _default;

/***/ })

},[[145,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/me/calculator.js.map