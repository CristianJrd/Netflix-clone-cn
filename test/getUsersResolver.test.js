const {resolvers} = require('../src')
const {getPrismaTestInstance} = require('./getPrismaTestInstance')

afterEach(async () => {
    await getPrismaTestInstance().mutation.deleteManyUsers({})
})

test('Query users all works', async () => {
    await getPrismaTestInstance().mutation.createUser({
        data:{
            name:"test1",
            lastname:"test",
            email:"test@gmail.com",
            password:"eltest",
            birth_date:"1992-08-09T00:00:00"
        }
    })

    expect(
        await resolvers.Query.users(
            {},
            {},
            {db:getPrismaTestInstance()},
            `{name,lastname,email}`
        )
    ).toMatchSnapshot()
})