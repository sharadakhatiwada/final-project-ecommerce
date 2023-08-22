export default function ProductTable() {
  return (
    <>
      <button type="button" class="btn btn-primary">
        Add New Product
      </button>
      <button
        type="button"
        class="btn btn-primary"
        style={{ marginLeft: "10px" }}
      >
        Users
      </button>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <button>Update</button>
            </td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
