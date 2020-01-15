import { load, getVideo, searchTvShow } from '../server/api'

beforeEach(() => {
    jest.resetModules();
})

afterEach(() => {
    jest.resetModules();
})

test('getVideo() should be return JSON', async () => {
    const query = 1;
    const returnData = await getVideo(query);
    expect(() => {
        JSON.parse(JSON.stringify(returnData))
    }).not.toThrow();
})

test('searchTvShow() should be return JSON', async () => {
    const name = 'ai'
    const returnData = await searchTvShow(name);
    expect(() => {
        JSON.parse(JSON.stringify(returnData))
    }).not.toThrow();
})

test('searchTvShow() should be return error message if its empty JSON', async() => {
    const name = 'asdsdaffssdsd'
    const errorMsg = 'no show';
    const returnData = await searchTvShow(name);
    const result = returnData.searchTvShow
    expect(result).toEqual(errorMsg)
})

test('load() should be return property "tvShowList"', async () => {
    return expect(await load()).toHaveProperty(['tvShowList']);
})

test('getOneImage() should be return property name "tvName", "oneImage", "summary" and "tvShowId" ', async () => {
    const returnData = await load();
    const data = returnData.tvShow;
    const tv = Object.keys(data);
    expect(tv).toStrictEqual(['tvName', 'oneImage', 'summary', 'tvShowId'])
})

test('getTvShow() should be return 60 length av tv show list ', async() => {
    const returnData = await load();
    const data = returnData.tvShowList;
    Object.keys(data).map((e,_) => {
        expect(data[e]).toHaveLength(60)
        })
})

