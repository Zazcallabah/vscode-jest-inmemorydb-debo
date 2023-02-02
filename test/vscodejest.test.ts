import { prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export class Data {
  @prop({ required: true, index: true, unique: true })
  dataId!: string;

  @prop({})
  data?: string;
}
const DataDocument = getModelForClass(Data);

const getDbData = async (dataId: string) => {
  return await DataDocument.find({ dataId });
};

// low enough to pass on run
// high enough to time out on debug
jest.setTimeout(500);

describe("vscode jest extension while testing inmemory mongodb", () => {
  beforeAll(async () => {
    const mongod = await MongoMemoryServer.create();
    const uri = await mongod.getUri();
    (global as any).__MONGOINSTANCE = mongod;
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf("/"));
    await mongoose.connect(`${process.env.MONGO_URI}/test`, {});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
    await instance.stop();
  });
  it("times out when debugging", async () => {
    const t = "setBreakpointOnThisLine";
    const d = await getDbData(t);
    console.log("step to here");
    const d2 = await getDbData(t);
    console.log("and here");
    expect(d2).toStrictEqual(d);
  });
});
