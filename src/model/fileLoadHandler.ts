export function fileLoadHandler(
  changeEvent: React.ChangeEvent<HTMLInputElement>
) {
  return new Promise<string>((resolve, reject) => {
    changeEvent.preventDefault();

    const reader = new FileReader();

    reader.onload = async (fileEvent) => {
      const text = fileEvent.target?.result;
      console.log('File loaded', { text });
      resolve(String(text));
    };

    const fileBlob = changeEvent.target.files?.[0];
    console.log({ fileBlob, files: changeEvent.target.files });

    if (fileBlob) {
      console.log('Begin loading file');
      reader.readAsText(fileBlob);
    } else {
      reject("Error: can't begin reading the file: file is null");
    }
  });
}
