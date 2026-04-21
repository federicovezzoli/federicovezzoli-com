export default {
    name: "cooperName",
    title: "Cooper's Names",
    type: "document",
    fields: [
      {
        title: "Name",
        name: "name",
        type: "string",
      }
    ],
  
    preview: {
      select: {
          name: "name"
      },
      prepare({ name }) {
        return {
          title: name,
        };
      },
    },
  };
  