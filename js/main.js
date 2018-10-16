$ = window.jQuery = require('jquery');

const {remote, ipcRenderer} = require("electron");
const app = remote.app;
const path = require('path');
const fs = require("fs");

var currentWindow = remote.getCurrentWindow();
var isMoving = false;
var originalPosition = {};

function hide() {
    remote.getCurrentWindow().minimize();
}

function openWindow(urlToOpen){
    $(".bodyContainer").addClass("dark");
    ipcRenderer.send("newWindowRequest", urlToOpen);
}

$(document).ready(function(){
    // TODO
    class Modal{

        /**** PROTOTYPE ****/
        /** 
        new Modal({
            title: "Alert",
            content: "An error has occured",
            buttons: [
                {text: "OK", onclick: "close"},
                {text: "See more", onclick: function(){ window.open(url) } }
            ]
         })
        **/
        constructor(obj){
            var thi$ = this; // Keep reference to this when we're in functions

            obj = obj || {};
            this.title = obj.title || "Alert";
            this.content = obj.content || "An error has occured";
            this.buttons = obj.buttons || [{text: "OK", onclick: "close"}];
            this.class = obj.class || "";
            
            this.showNow = obj.show || true;
            
            if($("#multiModal").get().length == 0) this.loadSkeleton() // If MultiModal doesn't exist, load it!
            
            $("#multiModal h2").text(this.title);
            $("#multiModal p").html(this.content);
            $("#multiModal .close").click(function(){
                thi$.kill();
            });

            var buttonDiv = $("#multiModal .buttons");
            $(buttonDiv).html(""); //Empty the div
            this.buttons.forEach(function(val, ix){ // For Each Buttons
                var highlightClass = ix==0?` class="highlight" `:""
                var el = $.parseHTML(`<button ${highlightClass}>${val.text}</button>`)

                // Events
                if(val.hasOwnProperty("onclick")){
                    if(val.onclick=="close"){
                        $(el).click(function(){
                            thi$.kill();
                        })
                    }else{
                        try{
                            $(el).click(function(){
                                val.onclick();
                            });
                        }catch(err){}
                    }
                }

                $(buttonDiv).append(el);
            });
            
            if(this.showNow){
                this.show();
            }
        }
        
        loadSkeleton(){
            // Load Modal Skeleton
            var skeletonURL = path.join(app.getAppPath(), "/pages/skeletons/modal.html");
            var skeletonFile = fs.readFileSync(skeletonURL).toString();
            this.skeleton = $.parseHTML(skeletonFile);

            $(".bodyContainer").append(this.skeleton);
            
        }
        
        show(){
            $("#multiModal").css("display", "block");
            setImmediate(function(){
                $("#multiModal").addClass("show");   
            });
        }

        kill(){
            $("#multiModal").removeClass("show");
            setTimeout(function(){
                $("#multiModal").css("display", "none");
            }, 300);
        };
    }
})