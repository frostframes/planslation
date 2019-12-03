<script>
    import { jsonData } from "./stores.js";
    let ok;
    const errorMessage = "I'm sorry, that file doesn't look right. ";
    export let message = "Please start by uploading your studies report";
    function onchange() {
      const file = this.files[0];
      
      if (file !== undefined) {
        
        if(file.type != "application/pdf"){
            jsonData.set({});
            ok = false;
        } else {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onloadend = function() {
                try {
                    let typedarray = new Uint8Array(fileReader.result);
                    pdfjsLib.getDocument(typedarray).then(function(pdf) {
                        let pageNum = 1;
                        let courses = [];
                        while (pageNum <= pdf.numPages) {
                            pdf.getPage(pageNum).then(function(page) {
                                page.getTextContent().then(function(text) { 
                                    // Get the text of each line of the PDF, with whitespace removed
                                    let paras = text.items.map(a => a.str.replace(/\s/g,''));
                                    for (let para of paras) {
                                        // Add lines to courses array if first 4 chars are letters and next 4 are numbers
                                        if (/^[A-Z]{4}\d{4}/.test(para)) {
                                            courses.push(para.substr(0,8));
                                        }
                                    }
                                    jsonData.set({'courses': courses});
                                    ok = true;
                                });
                            });
                            pageNum++;
                        }
                        
                    });
                } catch (e) {
                    jsonData.set({});
                    ok = false;
                }
            };
        }
      } else {
        jsonData.set({});
        ok = false;
      }
    }
</script>

<style>
    input {
      width: 100%;
      padding: 30px;
      background-color: cornsilk;
      border: 2px dashed peru;
    }
    h2 {
      margin: 0;
      padding: 20px 0;
    }
    .error {
      background-color: pink;
      border-color: darksalmon;
    }
    p {
      text-align: center;
    }
</style>
<h2>{ok === false ? errorMessage : ''}{message}</h2>
<input type="file" on:change={onchange} class={ok === false ? 'error' : ''} />

{#if !ok}
<p>Find out how to get your studies report in the <a href="https://my.uq.edu.au/information-and-services/information-technology/it-training/mysi-net-student-guide" target="guide">mySi-net student guide</a>.</p>
{/if}