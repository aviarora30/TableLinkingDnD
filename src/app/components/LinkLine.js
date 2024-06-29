"use client";

import React from "react";
import { connect } from "../utils";

function LinkLine({ data }) {
  const [source, target] = data;

  const style = connect(source, target, source.split('__')[0], target.split('__')[0], "red", 2);

  return <div style={style}></div>;
}

export default LinkLine;
