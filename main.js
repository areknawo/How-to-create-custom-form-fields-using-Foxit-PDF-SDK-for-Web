import "./style.css";

const licenseSN = "SHC10IZZP/KbrYSWHd1WMMAFqrs2T5v+yQEx6NIQVTbfdGXn7/u3Uw==";
const licenseKey =
  "PjwcmTawMSysb7uJGyG8Al6vU+Kb3zBnWrTpefiJ55Sp9YhAzbUb79Pucmjhc5kCf9duHOLaQLRts2s3Ef5l8jt+Vm9zkjHlLmiDFKCxw6Y6KdLBC8iC/aPKkHPkz/FKQJ/7DWN90VRj2jSRwKHAqA7p0vLq75rDXphcj9xNbqocU+78TAKuUAeDVFs8cVnj1QWZ1Zb8w/9cNqKskRlIpWCZGZEjTkRr7vZr5DHFnXp1i/ABJQzRTgaIPvhWUF0e52CXfSittqmO1cVhIysDkJfsknm6DPclj7XmIDf1c+xjGwCWwOJNvkaYrt2BOmtSlQi1OyeGjap7Wg7Gggo4MoT1uCDgigPFpfmeWxV+UjQkPTUQjMHcf8u7YQ5/9AQqNFdtHjchAor5yMkge6tmGyjpgvbYG15C8hIaPMJBr2bmljSGrjULxarXYu4+fo9hY55nTeXMJFyANf3gZxtrfOjBTdgLIdoK5HO9EmxQwHwdXqQlCT7p72JdB4uS2geF1sLZHyhNWZKx+6bgUf9jCD+Iq+S19FFwQ3pHB8K9pNsJHe54Izob94lUbu9/D1n0eeC4RL9a6F1cTduo4TyAaZTfzQ7HxQwQcsI1yczniNnZg4WoD9uExOcW4N4lC4fS+oY55US6ALXoGs4m4xr/tY2cHoOlWOWo+cOrEgRMaQDw1EeD3nTmojduV6Ib1WDMwvRiBRNqo8MVEEcQroxSdwySgRa5e8MnR3ofkCE9LnBgdq9L6oilkiXtfw3QIJzMbGPOvfR2wBw+1kGOF8L38eWv/1Xy61aww9nA1qKBt94yLNJef88ykiUMIYQCjj/3ARPSAjOWsj4rNux8/oY43eEd1psBUC3itoEkfz8R08d4mtuMAxYJ+laPbxSa/CmwFdYfwyIooRcGGS2Qx5GrdHyilOMidFWUn3dMawLRIgqtXWlxxizqUv/INTqP0kABDEFy4EfiELn1KL7XsR/x6Z6mQDb1RBP5x+cp1HmtRHczfN6up8DJPhNizhNNWx28fnvQ4gzuE3dVDa25+lBigCWh85VY/D5uD5HXOUjSOHm6X8JBW/ylf18Ojgz8+6tnXGE9yiMTuIdUsOjrdV+YS+LrZqBpnle8XfgLqRUzskhvBcApXzZY/hIynuzIFUDTkjrJv1ZuNgI9kLBRnJVySGP7xxF8TP8isKMhLgqK1herqCQorF2NHvusFSn9BbrbVWGuBpaO6OamW58ah/cUt1Tqpf3GN224piM=";
const viewerContainer = document.getElementById("viewer");
const pdfViewer = new PDFViewCtrl.PDFViewer({
  libPath: "./FoxitPDFSDKForWeb/lib",
  jr: {
    licenseSN,
    licenseKey,
  },
  customs: {
    ScrollWrap: PDFViewCtrl.CustomScrollWrap.create(viewerContainer),
  },
});
const loadPDF = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();

  return pdfViewer.openPDFByFile(blob);
};

pdfViewer.init(viewerContainer);

const randomId = () => `_${Math.random().toString(36).substring(2, 9)}`;
const FieldTypes = PDFViewCtrl.PDF.form.constant.Field_Type;
const menuContainer = document.getElementById("menu");
const formFields = [
  {
    label: "Push Button",
    name: "push-button",
    type: FieldTypes.PushButton,
    width: 50,
    height: 30,
  },
  {
    label: "Checkbox",
    name: "checkbox",
    type: FieldTypes.CheckBox,
    width: 50,
    height: 30,
  },
  {
    label: "Radio Button",
    name: "radio-button",
    type: FieldTypes.RadioButton,
    width: 80,
    height: 30,
  },
  {
    label: "Combo Box",
    name: "combo-box",
    type: FieldTypes.ComboBox,
    width: 60,
    height: 30,
  },
  {
    label: "List Box",
    name: "list-box",
    type: FieldTypes.ListBox,
    width: 60,
    height: 100,
  },
  {
    label: "Text",
    name: "text",
    type: FieldTypes.Text,
    width: 60,
    height: 30,
  },
];
const comboBoxOptions = [
  { label: "10", value: "10", selected: true, defaultSelected: true },
  { label: "20", value: "20", selected: false, defaultSelected: false },
  { label: "30", value: "30", selected: false, defaultSelected: false },
  { label: "40", value: "40", selected: false, defaultSelected: false },
];
const listBoxOptions = comboBoxOptions;
const loadFormFieldsMenu = async (PDFDoc) => {
  const PDFForm = await PDFDoc.loadPDFForm();

  formFields.forEach((formField) => {
    const element = document.createElement("div");

    element.draggable = true;
    element.id = formField.name;
    element.classList.add("menu-element");
    element.textContent = formField.label;
    element.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.id);
    });
    menuContainer.append(element);
  });

  viewerContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  viewerContainer.addEventListener("drop", async (event) => {
    event.preventDefault();
    const droppedFormFieldName = event.dataTransfer.getData("text/plain");
    const formField = formFields.find(
      ({ name }) => name === droppedFormFieldName
    );
    const pos = await pdfViewer.convertClientCoordToPDFCoord({
      clientX: event.clientX,
      clientY: event.clientY,
    });
    const id = randomId();

    await PDFForm.addControl(pos.index, id, formField.type, {
      left: pos.left - formField.width / 2,
      right: pos.left + formField.width / 2,
      top: pos.top + formField.height / 2,
      bottom: pos.top - formField.height / 2,
    });
    const field = PDFForm.getField(id);

    if (formField.type === FieldTypes.ComboBox) {
      field.setOptions(comboBoxOptions);
    } else if (formField.type === FieldTypes.ListBox) {
      field.setOptions(listBoxOptions);
    }
  });
};

loadPDF("./FoxitPDFSDKForWeb/docs/FoxitPDFSDKforWeb_DemoGuide.pdf").then(
  (PDFDoc) => {
    loadFormFieldsMenu(PDFDoc);
  }
);
