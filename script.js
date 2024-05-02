// ==UserScript==
// @name         Editable and Draggable DIV
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Create an editable and draggable DIV on any page
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let div = null;

    // Function to create the DIV element
    function createDiv() {
        div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '20px';
        div.style.left = '20px';
        div.style.width = '240px';
        div.style.height = '80px';
        div.style.backgroundColor = 'rgba(255, 255, 0, 0.6)';
        div.style.border = '1px solid black';
        div.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        div.style.zIndex = '9999';
        div.style.resize = 'both';
        div.style.overflow = 'auto';
        div.style.fontSize = '20px';
        div.contentEditable = 'true';
        div.textContent = 'Editable and Draggable DIV';

        // Add event listeners for dragging
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        div.addEventListener('mousedown', dragStart);
        div.addEventListener('mouseup', dragEnd);
        div.addEventListener('mousemove', drag);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === div) {
                isDragging = true;
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;

            isDragging = false;
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();

                if (e.target === div) {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;

                    xOffset = currentX;
                    yOffset = currentY;

                    setTranslate(currentX, currentY, div);
                }
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }

        return div;
    }

    let ctrlPressed = false;
    let shiftPressed = false;
    let altPressed = false;
    let plusPressed = false;

    // Event listener for key combination
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey) {
            ctrlPressed = true;
        }
        if (event.shiftKey) {
            shiftPressed = true;
        }
        if (event.altKey) {
            altPressed = true;
        }
        if (event.key === '+') {
            plusPressed = true;
        }
        console.log("press", ctrlPressed, shiftPressed, altPressed, plusPressed)
        if (ctrlPressed && shiftPressed && altPressed && plusPressed) {
            if (!div) {
                document.body.appendChild(createDiv());
            } else {
                div.remove();
                div = null;
            }
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.ctrlKey) {
            ctrlPressed = false;
        }
        if (event.shiftKey) {
            shiftPressed = false;
        }
        if (event.altKey) {
            altPressed = false;
        }
        if (event.key === '+') {
            plusPressed = false;
        }
    });
})();
