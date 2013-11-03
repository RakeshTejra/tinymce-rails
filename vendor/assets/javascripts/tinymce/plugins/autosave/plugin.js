tinymce.PluginManager.add("autosave",function(t){function e(t,e){var a={s:1e3,m:6e4};return t=/^(\d+)([ms]?)$/.exec(""+(t||e)),(t[2]?a[t[2]]:1)*parseInt(t,10)}function a(){var t=parseInt(m.getItem(g+"autosave.time"),10)||0;return(new Date).getTime()-t>c.autosave_retention?(n(!1),!1):!0}function n(e){m.removeItem(g+"autosave.draft"),m.removeItem(g+"autosave.time"),e!==!1&&t.fire("RemoveDraft")}function o(){v()||(m.setItem(g+"autosave.draft",t.getContent({format:"raw",no_events:!0})),m.setItem(g+"autosave.time",(new Date).getTime()),t.fire("StoreDraft"))}function r(){a()&&(t.setContent(m.getItem(g+"autosave.draft"),{format:"raw"}),t.fire("RestoreDraft"))}function s(){d||(setInterval(function(){t.removed||o()},c.autosave_interval),d=!0)}function i(){var e=this;e.disabled(!a()),t.on("StoreDraft RestoreDraft RemoveDraft",function(){e.disabled(!a())}),s()}function u(){t.undoManager.beforeChange(),r(),n(),t.undoManager.add()}function f(){var t;return tinymce.each(tinymce.editors,function(e){e.plugins.autosave&&e.plugins.autosave.storeDraft(),!t&&e.isDirty()&&e.getParam("autosave_ask_before_unload",!0)&&(t=e.translate("You have unsaved changes are you sure you want to navigate away?"))}),t}function v(e){var a=t.settings.forced_root_block;return e=tinymce.trim("undefined"==typeof e?t.getBody().innerHTML:e),""===e||new RegExp("^<"+a+"[^>]*>(( |&nbsp;|[ 	]|<br[^>]*>)+?|)</"+a+">|<br>$","i").test(e)}var d,c=t.settings,m=tinymce.util.LocalStorage,g=t.id;c.autosave_interval=e(c.autosave_interval,"30s"),c.autosave_retention=e(c.autosave_retention,"20m"),t.addButton("restoredraft",{title:"Restore last draft",onclick:u,onPostRender:i}),t.addMenuItem("restoredraft",{text:"Restore last draft",onclick:u,onPostRender:i,context:"file"}),t.settings.autosave_restore_when_empty!==!1&&(t.on("init",function(){a()&&v()&&r()}),t.on("saveContent",function(){n()})),window.onbeforeunload=f,this.hasDraft=a,this.storeDraft=o,this.restoreDraft=r,this.removeDraft=n,this.isEmpty=v});