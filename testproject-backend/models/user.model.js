module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      fio: String,
      post: String,
      salary: Number,
      birthday: Date,
      published: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
