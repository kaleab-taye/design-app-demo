import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { read, writeFileXLSX, utils } from 'xlsx';
import { Drawer } from '@mui/material';
import { Datalist } from './components/datalist';

export default function Home() {
  const [selectedHeader, setSelectedHeader] = useState('idl');
  const [selectedBodyContent, setSelectedBodyContent] = useState('idl');

  const [currentHeaderDesign, setCurrentHeadDesign] = useState('');
  const [currentBodyDesign, setCurrentBodyDesign] = useState('');

  const [rowNumber, setRowNumber] = useState(3);
  const [columnNumber, setColumnNumber] = useState(2);

  const [previewState, setPreviewState] = useState(false);
  const [dataList, setDataList] = useState(null);

  // test Design items
  const [rowState, setRowState] = useState('');
  const [columnState, setColumnState] = useState('');

  // field data
  const [logo1State, setLogo1State] = useState(null);
  const [logo2State, setLogo2State] = useState(null);
  const [companyName1State, setCompanyName1State] = useState(null);
  const [companyName2State, setCompanyName2State] = useState(null);

  const headerDesigns = [
    {
      name: 'header1',
      design: {
        className: 'grid grid-flow-col grid-cols-5 mr-auto gap-2 w-full',
        previewClassName: 'grid grid-flow-col grid-cols-5 mr-auto gap-2 w-full',
        data: null,
        children: [
          {
            className:
              'bg-gray-400 w-10 h-10 min-h-full min-w-full m-auto rounded-full col-span-1',
            previewClassName:
              'bg-gray-400 w-10 h-10 min-h-full min-w-full m-auto rounded-full col-span-1',
            data: null,
            type: 'staticInput',
            input: 'file',
            name: 'logo1',
            children: [],
          },
          {
            className: 'gap-1 grid mr-auto col-span-4 w-full',
            previewClassName: 'gap-0 grid mr-auto col-span-4 w-full',
            data: null,
            children: [
              {
                className: ' text-center mt-auto font-bold text-sm',
                previewClassName: ' text-center mt-auto font-bold text-2xl',
                data: 'Addis Ababa University',
                children: null,
                type: 'staticInput',
                input: 'text',
                name: 'companyName1',
              },
              {
                className: ' text-xs text-center font-medium mb-auto ',
                previewClassName: ' text-center mb-auto text-xl',
                data: 'አዲስ አበባ ዩኒቨርሲት',
                children: null,
                type: 'staticInput',
                input: 'text',
                name: 'companyName2',
              },
            ],
          },
        ],
      },
    },
    {
      name: 'header2',
      design: {
        previewClassName: 'grid grid-flow-col grid-cols-5 mr-auto gap-2 w-full',
        className: 'grid grid-flow-col grid-cols-5 mr-auto gap-2 w-full',
        data: null,
        children: [
          {
            className: 'gap-1 grid mr-auto col-span-4 w-full',
            previewClassName: 'gap-1 grid mr-auto col-span-4 w-full',
            data: null,
            children: [
              {
                className: ' text-center mt-auto font-bold text-sm',
                previewClassName: ' text-center mt-auto font-bold text-2xl',
                data: 'Addis Ababa University',
                children: null,
                type: 'staticInput',
                input: 'text',
                name: 'companyName1',
              },
              {
                className: ' text-xs text-center font-medium mb-auto ',
                previewClassName: ' text-center mb-auto text-xl',
                data: 'አዲስ አበባ ዩኒቨርሲት',
                children: null,
                type: 'staticInput',
                input: 'text',
                name: 'companyName2',
              },
            ],
          },
          {
            className:
              'bg-gray-400 w-10 h-10 min-h-full min-w-full  m-auto rounded-full col-span-1',
            previewClassName:
              'bg-gray-400 w-10 h-10 min-h-full min-w-full  m-auto rounded-full col-span-1',
            children: null,
            data: null,
            type: 'staticInput',
            input: 'file',
            name: 'logo1',
          },
        ],
      },
    },
    {
      name: 'header3',
      design: {
        previewClassName: 'grid grid-flow-col grid-cols-5 mr-auto gap-2 w-full',
        className: 'grid grid-flow-col grid-cols-5 mr-auto gap-2 w-full',
        data: null,
        children: [
          {
            className:
              'bg-gray-400 w-10 h-10 min-h-full min-w-full  m-auto rounded-full col-span-1',
            previewClassName:
              'bg-gray-400 w-10 h-10 min-h-full min-w-full  m-auto rounded-full col-span-1',
            children: null,
            data: null,
            type: 'staticInput',
            input: 'file',
            name: 'logo1',
          },
          {
            className: 'gap-1 grid mr-auto col-span-3 w-full',
            previewClassName: 'gap-1 grid mr-auto col-span-3 w-full',
            data: null,
            children: [
              {
                className: ' text-center mt-auto font-bold text-sm',
                previewClassName: ' text-center mt-auto font-bold text-2xl',
                data: 'Addis Ababa University',
                children: null,
                type: 'staticInput',
                input: 'text',
                name: 'companyName1',
              },
              {
                className: ' text-xs text-center font-medium mb-auto ',
                previewClassName: ' text-center mb-auto text-xl',
                data: 'አዲስ አበባ ዩኒቨርሲት',
                children: null,
                type: 'staticInput',
                input: 'text',
                name: 'companyName2',
              },
            ],
          },
          {
            className:
              'bg-gray-400 w-10 h-10 min-h-full min-w-full  m-auto rounded-full col-span-1',
            previewClassName:
              'bg-gray-400 w-10 h-10 min-h-full min-w-full  m-auto rounded-full col-span-1',
            children: null,
            data: null,
            type: 'staticInput',
            input: 'file',
            name: 'logo2',
          },
        ],
      },
    },
    {
      name: 'header4',
      design: {
        className: 'grid grid-flow-col grid-cols-5 mr-auto gap-2 w-full h-full',
        previewClassName:
          'grid grid-flow-col grid-cols-5 mr-auto gap-2 w-full h-full',
        data: null,
        children: [
          {
            className: 'gap-1 grid mr-auto col-span-5 w-full h-full',
            previewClassName: 'gap-1 grid mr-auto col-span-5 w-full h-full',
            data: null,
            children: [
              {
                className: ' text-center mt-auto font-bold text-sm',
                previewClassName: ' text-center mt-auto font-bold text-2xl',
                data: 'Addis Ababa University',
                children: null,
                type: 'staticInput',
                input: 'text',
                name: 'companyName1',
              },
              {
                className: ' text-xs text-center font-medium mb-auto ',
                previewClassName: ' text-center mb-auto text-xl',
                data: 'አዲስ አበባ ዩኒቨርሲት',
                children: null,
                type: 'staticInput',
                input: 'text',
                name: 'companyName2',
              },
            ],
          },
        ],
      },
    },
  ];

  const divBuilder = (data) => {
    return (
      <div className={data.className}>
        {data.children != null && data.children.length > 0
          ? data.children.map((child) => divBuilder(child))
          : null}
        {data.data}
      </div>
    );
  };
  function previewDivBuilder(data) {
    // type: 'staticInput',
    //         input: 'image',
    return (
      <div id={data.name ? data.name : null} className={data.previewClassName}>
        {data.children != null && data.children.length > 0
          ? data.children.map((child) => previewDivBuilder(child))
          : null}

        {data.name && data.name === 'logo1' && logo1State !== null
          ? logo1State
          : data.name && data.name === 'logo2' && logo2State !== null
          ? logo2State
          : data.name &&
            data.name === 'companyName1' &&
            companyName1State !== null
          ? companyName1State
          : data.name &&
            data.name === 'companyName2' &&
            companyName2State !== null
          ? companyName2State
          : data.data}
      </div>
    );
  }
  const bodyDesigns = [
    {
      name: 'body1',
      design: {
        className: 'grid grid-flow-col grid-cols-6 mr-auto gap-2 w-full',
        data: null,
        children: [
          {
            className: 'bg-gray-400  h-20 min-h-full col-span-2 ',
            data: null,
            children: null,
          },
          {
            className: 'gap-1 grid mr-auto py-2 col-span-4 h-full w-full',
            data: null,
            container: 'row',
            children: [
              {
                className: 'grid grid-flow-col h-full w-full gap-1',
                data: null,
                container: 'column',
                children: [
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                ],
              },
              {
                className: 'grid grid-flow-col h-full  gap-1',
                data: null,
                container: 'column',
                children: [
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                ],
              },
              {
                className: 'grid grid-flow-col h-full gap-1',
                data: null,
                container: 'column',
                children: [
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      name: 'body2',
      design: {
        className: 'grid grid-flow-col mr-auto gap-2 grid-cols-6 w-full',
        data: null,
        children: [
          {
            className: 'gap-1 grid mr-auto py-2 col-span-4 h-full w-full',
            data: null,
            container: 'row',
            children: [
              {
                className: 'grid grid-flow-col h-full w-full gap-1',
                data: null,
                container: 'column',
                children: [
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                ],
              },
              {
                className: 'grid grid-flow-col h-full  gap-1',
                data: null,
                container: 'column',
                children: [
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                ],
              },
              {
                className: 'grid grid-flow-col h-full gap-1',
                data: null,
                container: 'column',
                children: [
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                  {
                    className: 'bg-gray-400 h-full ',
                    children: null,
                    data: null,
                  },
                ],
              },
            ],
          },
          {
            className: 'bg-gray-400  h-20 min-h-full col-span-2 ',
            data: null,
            children: null,
          },
        ],
      },
    },
    {
      name: 'body3',
      design: {
        className: 'grid grid-flow-col mr-auto gap-2  h-20 min-h-full  w-full',
        data: null,
        children: [
          {
            className: 'gap-1 grid mr-auto w-full ',
            data: null,
            container: 'row',
            children: [
              {
                className: 'grid grid-flow-col h-full w-full gap-1',
                data: null,
                container: 'column',
                children: [
                  {
                    className: 'bg-gray-400 h-full w-full',
                    children: null,
                    data: null,
                  },
                  {
                    className: 'bg-gray-400 h-full w-full',
                    children: null,
                    data: null,
                  },
                ],
              },
              {
                className: 'grid grid-flow-col h-full w-full gap-1',
                data: null,
                container: 'column',
                children: [
                  {
                    className: 'bg-gray-400 h-full w-full',
                    children: null,
                    data: null,
                  },
                  {
                    className: 'bg-gray-400 h-full w-full',
                    children: null,
                    data: null,
                  },
                ],
              },
              {
                className: 'grid grid-flow-col h-full gap-1 w-full',
                data: null,
                container: 'column',
                children: [
                  {
                    className: 'bg-gray-400 h-full w-full',
                    children: null,
                    data: null,
                  },
                  {
                    className: 'bg-gray-400 h-full w-full',
                    children: null,
                    data: null,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  ];

  useEffect(() => {
    try {
      document.getElementById('companyName1').value = companyName1State;
      console.log('dd', document.querySelector('#companyName1'));
      console.log('companyName1State', companyName1State);
    } catch (error) {}
  }, [companyName1State]);

  // const testBodyDesign = [
  //   {
  //     name: 'body1',
  //     design: {
  //       className: 'grid grid-flow-col grid-cols-6 mr-auto gap-2 w-full',
  //       data: null,
  //       children: [
  //         {
  //           className: 'bg-gray-400  col-span-2 ',
  //           data: null,
  //           children: null,
  //         },
  //         {
  //           className: 'gap-1 grid mr-auto col-span-4 h-full w-full',
  //           data: null,
  //           container: 'row',
  //           children: [
  //             {
  //               item: 'row',
  //               container: 'column',
  //               className: 'grid grid-flow-col h-full w-full gap-1',
  //               data: null,
  //               children: [
  //                 {
  //                   item: 'column',
  //                   className: 'bg-gray-400  h-full',
  //                   children: null,
  //                   data: null,
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   },
  // ];

  const preDivBuilder = (data, rowNumber, columnNumber) => {
    let rowData;
    let columnData;

    const rowColumnIdentifier = (json) => {
      if (json.children && json.children.length > 0) {
        if (json.container && json.container === 'row') {
          rowData = json.children[0];
        } else if (json.container && json.container === 'column') {
          columnData = json.children[0];
        }
        return json.children.map((item) => rowColumnIdentifier(item));
      }
    };

    const rowColumnSetter = (tempJson) => {
      if (tempJson.children && tempJson.children.length > 0) {
        if (tempJson.container && tempJson.container === 'row') {
          tempJson.children = rows;
        } else if (tempJson.container && tempJson.container === 'column') {
          tempJson.children = cols;
        }
        tempJson.children.map((item) => rowColumnSetter(item));
      }
    };

    console.log('incoming', data);
    rowColumnIdentifier(data.design);

    let rows = [];
    for (var i = rowNumber; i > 0; i--) {
      rows.push(rowData);
    }

    let cols = [];
    for (var i = columnNumber; i > 0; i--) {
      cols.push(columnData);
    }

    const tempJson = { ...data };
    rowColumnSetter(data.design);

    return tempJson;
  };
  // handle row number increase
  useEffect(() => {
    const design = bodyDesigns.filter(
      (body) => body.name === selectedBodyContent
    );
    if (selectedBodyContent != 'idl' && design[0]) {
      const item = preDivBuilder(design[0], rowNumber, columnNumber);
      setCurrentBodyDesign(divBuilder(item.design));
    }
  }, [rowNumber, columnNumber]);

  //  handle header selection change
  useEffect(() => {
    const design = headerDesigns.filter(
      (header) => header.name === selectedHeader
    );
    if (design[0]) {
      setCurrentHeadDesign(
        previewDivBuilder(design[0].design, companyName1State)
      );
    }
  }, [selectedHeader]);
  // handle body selection change
  useEffect(() => {
    const design = bodyDesigns.filter(
      (body) => body.name === selectedBodyContent
    );
    if (design[0]) {
      setCurrentBodyDesign(divBuilder(design[0].design));
    }
    setRowNumber(3);
    setColumnNumber(2);
  }, [selectedBodyContent]);
  // handle file selection
  const handleInput = async (e) => {
    console.log('xlsx');
    const data = await e.arrayBuffer();
    const workbook = read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);

    setDataList(jsonData);
    console.log('data', data);
    console.log('workbook', workbook);
    console.log('worksheet', worksheet);
    console.log('json', jsonData);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-10 my-10">
        {/* template selection start */}
        <div className="col-span-3 gap-10 grid mr-18 max-w-[250px] mx-auto">
          {/* header start */}
          <div className="grid gap-3">
            <div className="text-sm text-gray-500">header</div>
            <div className=" grid gap-5">
              {headerDesigns.map((header) => (
                <div
                  key={header.name}
                  onClick={() => setSelectedHeader(header.name)}
                >
                  {divBuilder(header.design)}
                </div>
              ))}
            </div>
          </div>
          {/* header end */}
          {/* body start */}
          <div className="grid gap-3">
            <div className="text-sm text-gray-500">body</div>
            <div className=" grid gap-5">
              {bodyDesigns.map((body) => (
                <div
                  key={body.name}
                  onClick={() => setSelectedBodyContent(body.name)}
                >
                  {divBuilder(body.design)}
                </div>
              ))}
            </div>
          </div>
          {/* body end */}
        </div>
        {/* template selection end */}
        {/* selected display showcase area start */}
        <div className="col-span-7 grid mb-auto gap-3  max-w-[700px]">
          <div className="text-sm text-gray-500">output</div>
          {/* final card design display start */}
          <div className="gap-5 grid">
            <div className="grid h-24">
              {selectedHeader !== 'idl' ? (
                currentHeaderDesign
              ) : (
                <div>select header</div>
              )}
            </div>
            <div className="grid h-60">
              {selectedBodyContent !== 'idl' ? (
                currentBodyDesign
              ) : (
                <div>select body</div>
              )}
            </div>
          </div>
          {/* final card design display end */}

          <div className="grid gap-2 grid-flow-col my-5 text-md text-gray-500">
            {/* row selection display start */}
            <div className="grid grid-flow-col mr-auto gap-2 ">
              <div className="grid m-auto">No of rows</div>
              <div className="grid grid-flow-col mr-auto gap-4">
                <div
                  onClick={() => setRowNumber((n) => n + 1)}
                  className="bg-gray-200 px-2 m-auto grid cursor-pointer"
                >
                  +
                </div>
                <div className="m-auto">{rowNumber}</div>
                <div
                  className="bg-gray-200 px-2 m-auto grid cursor-pointer"
                  onClick={() => setRowNumber((n) => n - 1)}
                >
                  -
                </div>
              </div>
            </div>
            {/* row selection display end */}
            {/* column selection display start */}
            <div className="grid grid-flow-col mr-auto gap-2">
              <div className="grid m-auto">No of columns</div>
              <div className="grid grid-flow-col mr-auto gap-4">
                <div
                  onClick={() => setColumnNumber((n) => n + 1)}
                  className="bg-gray-200 px-2 m-auto grid cursor-pointer"
                >
                  +
                </div>
                <div className="m-auto">{columnNumber}</div>
                <div
                  className="bg-gray-200 px-2 m-auto grid cursor-pointer"
                  onClick={() => setColumnNumber((n) => n - 1)}
                >
                  -
                </div>
              </div>
            </div>
            {/* column selection display end */}
          </div>
          <div className="grid gap-3">
            <div>static data</div>
            <div className="grid gap-1">
              <div className="grid grid-flow-col gap-2 mr-auto ">
                <div className="grid ">Company Name 1</div>
                <input
                  className="border grid "
                  value={companyName1State}
                  onChange={(e) => setCompanyName1State( e.target.value)}
                />
              </div>
              <div className="grid grid-flow-col gap-2 mr-auto ">
                <div className="grid ">Company Name 2</div>
                <input
                  className="border grid "
                  value={companyName2State}
                  onChange={(e) => setCompanyName2State((f) => e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* file import*/}
          <div className="grid my-10 gap-5">
            <input
              className="grid mr-auto hover:cursor-pointer"
              type="file"
              onChange={(e) => handleInput(e.target.files[0])}
            />
            <div
              onClick={() => setPreviewState(true)}
              className="text-blue-400 hover:bg-blue-400 hover:text-white hover:cursor-pointer text-md font-bold border mr-auto px-3 py-1 rounded-md"
            >
              Preview
            </div>
            <Drawer
              anchor="top"
              open={previewState}
              onClose={() => setPreviewState(false)}
            >
              <div className="h-[100vh]">
                <div className="grid">
                  <div
                    className="grid ml-auto text-center px-5 py-2 bg-gray-100 mr-5 mt-5 text-gray-600"
                    onClick={() => setPreviewState(false)}
                  >
                    X
                  </div>
                </div>
                <div className="gap-3  max-w-[700px] mx-auto my-5">
                  <div>
                    <div className="gap-5 grid">
                      <div className="grid h-24">
                        {selectedHeader !== 'idl' ? (
                          currentHeaderDesign
                        ) : (
                          <div>select header</div>
                        )}
                      </div>
                      <div className="grid h-60">
                        {selectedBodyContent !== 'idl' ? (
                          currentBodyDesign
                        ) : (
                          <div>select body</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {dataList === null ? (
                  'no excel file selected for preview.'
                ) : (
                  <div>
                    <Datalist
                      header={selectedHeader}
                      body={selectedBodyContent}
                      data={dataList}
                    />
                  </div>
                )}
              </div>
              previewed
            </Drawer>
          </div>
        </div>
        {/* selected display showcase area end */}
      </div>

      <div>
        <div>test</div>
        {/* companyName1State */}
        {/* testBodyDesign.map((item) => divBuilder(item.design)) */}
      </div>

      <footer className={styles.footer}>
        <a
          href="https://qmem-developers.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className="my-auto mx-1">Qmem Devs</span>
        </a>
      </footer>
    </div>
  );
}
