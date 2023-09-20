import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import DecoupledcEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import dynamic from "next/dynamic";

function CKeditorGenerator(props) {
  // console.log(props.input.value)
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        {...props.input}
        // editor={DecoupledcEditor}
        data={props.input.value}
         onReady={(editor) => {
          // console.log(editor, "wtertewrwr112")
        //     editor.ui
        //         .getEditableElement()
        //         .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui
        //             .getEditableElement());
         }}
        onChange={(event, editor) => {
          const data = editor.getData();
          props.input.onChange(data);
        }}
        // config={{
        //     toolbarLocation: "top",
        // }}
      />
    </div>
  );
}

export default CKeditorGenerator;
