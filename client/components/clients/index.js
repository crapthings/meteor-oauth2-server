const Index = Container((props, onData) => {
  const loaded = Meteor.subscribe('clients').ready()
  if (loaded) {
    const clients = Clients.find({}, {
      sort: {
        createdAt: -1
      }
    }).fetch()
    onData(null, { clients })
  }
})(({ clients }) => <div>
  <form id='client-form' onSubmit={submit}>
    <table>
      <thead>
        <tr>
          <td>_id</td>
          <td>client name</td>
          <td>client id</td>
          <td>client secret</td>
          <td>client redirect uri</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td className='ui-unpadded'>
            <input className='ui-fit-width ui-padded-sm ui-unbordered' type='text' name='clientName' />
          </td>
          <td className='ui-unpadded'>
            <input className='ui-fit-width ui-padded-sm ui-unbordered' type='text' name='clientId' />
          </td>
          <td className='ui-unpadded'>
            <input className='ui-fit-width ui-padded-sm ui-unbordered' type='text' name='clientSecret' />
          </td>
          <td className='ui-unpadded'>
            <input className='ui-fit-width ui-padded-sm ui-unbordered' type='text' name='redirectUri' />
          </td>
          <td className='ui-unpadded ui-align-center'>
            <input className='ui-padded-sm' type='submit' value='提交' />
          </td>
        </tr>
        {clients.map(client => <tr key={client._id}>
          <td>{client._id}</td>
          <td>{client.clientName}</td>
          <td>{client.clientId}</td>
          <td>{client.clientSecret}</td>
          <td>{client.redirectUri}</td>
          <td>
            <button type='button' onClick={() => remove(client._id)}>删除</button>
          </td>
        </tr>)}
      </tbody>
    </table>
  </form>
</div>)

FlowRouter.route('/clients', {
  action() {
    Mount(DefaultLayout, { Index })
  },

  name: 'clients',
})

function submit(e) {
  e.preventDefault()
  const data = Form2js('client-form')
  Meteor.call('clients.add', data)
}

function remove(_id) {
  if (confirm('确定要删除吗？'))
    Meteor.call('clients.remove', _id)
}
