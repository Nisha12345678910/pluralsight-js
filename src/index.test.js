import {expert} from "chai";
import jsdom from "jsdom";
import fs from "fs";

describe("our first test", ()=>{
it("should pass",()=>{
    expect(true).to.equal(false);
});
});

describe("index.html", ()=>{
    it("should say hello",
    ()=>{
       const index=fs.readFileSync("./src/index.html","utf-8");
       const {JSDOM}=jsdom;
       const dom=new JSDOM(index);
       const h1=dom.window.document.getElementsByTagName("h1")[0];
       expert(h1.innerHTML).to.equal("Hello World!");
       dom.window.close();
    });
});