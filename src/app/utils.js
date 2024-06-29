export const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight,
  };
};

export const isVisible = function (ele, container) {
    const eleTop = ele.offsetTop;
    const eleBottom = eleTop + ele.clientHeight;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;

    // The element is fully visible in the container
    /* return (
        (eleTop >= containerTop && eleBottom <= containerBottom) ||
        // Some part of the element is visible in the container
        (eleTop < containerTop && containerTop < eleBottom) ||
        (eleTop < containerBottom && containerBottom < eleBottom)
    ); */

    if((eleTop >= containerTop && eleBottom <= containerBottom) ||
        (eleTop < containerTop && containerTop < eleBottom) ||
        (eleTop < containerBottom && containerBottom < eleBottom)
    ) {
        return 0
    } else if(eleBottom < containerTop) {
        return 1
    } else {
        return -1
    }
};


export const connect = (id1, id2, conatinerId1, conatinerId2, color, thickness) => {
  const div1 = document.getElementById(id1);
  const div2 = document.getElementById(id2);
  const container1 = document.getElementById(conatinerId1);
  const container2 = document.getElementById(conatinerId2);

  if (!div1 || !div2 || !container1 || !container2) {
    console.error("Element not found");
    return;
  }

  const div1Pos = isVisible(div1, container1);
  const div2Pos = isVisible(div2, container2);

  let off1 = getOffset(div1Pos === 0 ? div1 : container1);
  let off2 = getOffset(div2Pos === 0 ? div2 : container2);
  
  const margin = 10
  let x1 = off1.left;
  let y1 = off1.top + off1.height / 2;
  if(div1Pos < 0) {
    y1 = off1.top + off1.height + margin;
  } else if(div1Pos > 0) {
    y1 = off1.top - margin;
  }

  let x2 = off2.left;
  let y2 = off2.top + off2.height / 2;
  if(div2Pos < 0) {
    y2 = off2.top + off2.height + margin;
  } else if(div2Pos > 0) {
    y2 = off2.top - margin;
  }

  if(off1.left > off2.left) {
    x2 += off2.width
  } else {
    x1 += off1.width
  }

  const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

  const cx = (x1 + x2) / 2 - length / 2;
  const cy = (y1 + y2) / 2 - thickness / 2;

  const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
  
  return {
    height: `${thickness}px`,
    backgroundColor: color,
    lineHeight: "1px",
    position: "absolute",
    left: `${cx}px`,
    top: `${cy}px`,
    width: `${length}px`,
    transform: `rotate(${angle}deg)`,
  };
};
