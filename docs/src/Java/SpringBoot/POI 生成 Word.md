

```shell
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>5.3.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml-schemas</artifactId>
            <version>4.1.2</version>
        </dependency>
```



```shell
package com.hailoworld.service;

import com.baidubce.qianfan.Qianfan;
import com.baidubce.qianfan.core.auth.Auth;
import com.baidubce.qianfan.model.chat.ChatResponse;
import lombok.SneakyThrows;
import org.apache.poi.util.Units;
import org.apache.poi.xddf.usermodel.*;
import org.apache.poi.xddf.usermodel.chart.*;
import org.apache.poi.xwpf.usermodel.*;
import org.openxmlformats.schemas.drawingml.x2006.chart.CTBarSer;
import org.openxmlformats.schemas.drawingml.x2006.chart.CTDLbls;
import org.openxmlformats.schemas.drawingml.x2006.chart.STDLblPos;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.*;

import javax.imageio.ImageIO;
import Java.awt.image.BufferedImage;
import Java.io.*;
import Java.math.BigInteger;
import Java.net.MalformedURLException;
import Java.net.URL;
import Java.util.ArrayList;
import Java.util.List;
import Java.util.concurrent.Callable;
import Java.util.concurrent.ExecutorService;
import Java.util.concurrent.Executors;
import Java.util.concurrent.Future;

/**
 * @Author: wen7
 */
public class Main {
    static List<String> titleList = List.of("一、本周工作内容","二、遇到的问题以及解决方案","三、下周工作计划","四、需要协调与支持","五、其他备注");

    public static void main(String[] args) throws IOException {
        //generateReport();
        Qianfan qianfan = new Qianfan(Auth.TYPE_OAUTH, "DXJugeVGbmUEZQzKa3SlLudY", "WZJzle1BOgh3NihhR4FsQnqqii3BvZ7z");

        ChatResponse response = qianfan.chatCompletion()
                .addMessage("user", "作为一个城市绿化养护公司的项目经理，结合植物生长趋势，天气，环境，工人作业环境，给我下个阶段对修剪工作的计划，100字以内，只需要给计划内容不需要标题。")
                .execute();
        System.out.println(response.getResult());
    }


    public static void generateReport() {
        Main main = new Main();

        // 创建一个新的空白Word文档
        XWPFDocument document = new XWPFDocument();

        main.setStyle(document);        // 设置样式


        main.generateTitle(document,"绿化养护周报");                  //标题
        main.generateSummary(document);         // 主要梗概


        main.generateHeading(document,"一、本周工作内容",1);
        main.generateHeading(document,"(1) 绿化区域概述",2);
        main.generateGS(document);
        main.generateHeading(document,"(2) 本周工单详情",2);
        main.createBarChart(document);
        main.generateHeading(document,"1.修剪工单",3);
        main.generatePicture(document,null);
        main.generateHeading(document,"2.浇水工单",3);
        main.generateHeading(document,"3.病虫害防治工单",3);
        main.generateHeading(document,"4.清理维护工单",3);
        main.generateHeading(document,"二、遇到的问题以及解决方案",1);
        main.generateHeading(document,"(1) 问题1",2);
        main.generateHeading(document,"(2) 问题2",2);
        main.generateHeading(document,"三、下周工作计划",1);
        main.generateHeading(document,"(1) 修剪工作",2);
        main.generateHeading(document,"(2) 浇水施肥",2);
        main.generateHeading(document,"(3) 病虫害防治",2);
        main.generateHeading(document,"(4) 清理维护",2);
        main.generateHeading(document,"(5) 其他养护工作",2);
        main.generateHeading(document,"四、需要协调与支持",1);
        main.generateHeading(document,"(1) 协调事项",2);
        main.generateHeading(document,"(2) 支持事项",2);
        main.generateHeading(document,"五、其他备注",1);

        main.generateDocument(document);        // 生成文档
    }

    private void generateGS(XWPFDocument document) {
        XWPFParagraph paragraph = document.createParagraph();
        XWPFRun run = paragraph.createRun();
        List<String> list = new ArrayList<>();
        list.add("asdf");
        list.add("sdf");
        list.add("dfsgdfg");

        for (int i = 0; i < list.size(); i++) {
            run.setText("  " + (i+1) + ".标段名称" + list.get(i));
            run.addBreak(BreakType.TEXT_WRAPPING);
            run.setText("    项目经理: xx");
            run.addBreak(BreakType.TEXT_WRAPPING);
            run.setText("    养护面积: xx");
            run.addBreak(BreakType.TEXT_WRAPPING);
        }
    }

    @SneakyThrows
    private void generatePicture(XWPFDocument document, List<String> urlList) {
        if(urlList==null || urlList.size()==0){
            urlList = new ArrayList<>();
            urlList.add("https://xingjing-gis.oss-cn-shanghai.aliyuncs.com/gis/ef13229f-e3e2-4202-9042-3c170ebba6de.scaled_4e230668-655e-4def-a31c-b6565a4a78116766745004344442281.jpg");
            urlList.add("https://xingjing-gis.oss-cn-shanghai.aliyuncs.com/gis/ef13229f-e3e2-4202-9042-3c170ebba6de.scaled_4e230668-655e-4def-a31c-b6565a4a78116766745004344442281.jpg");
            urlList.add("https://xingjing-gis.oss-cn-shanghai.aliyuncs.com/gis/ef13229f-e3e2-4202-9042-3c170ebba6de.scaled_4e230668-655e-4def-a31c-b6565a4a78116766745004344442281.jpg");
            urlList.add("https://xingjing-gis.oss-cn-shanghai.aliyuncs.com/gis/ef13229f-e3e2-4202-9042-3c170ebba6de.scaled_4e230668-655e-4def-a31c-b6565a4a78116766745004344442281.jpg");
            urlList.add("https://xingjing-gis.oss-cn-shanghai.aliyuncs.com/gis/ef13229f-e3e2-4202-9042-3c170ebba6de.scaled_4e230668-655e-4def-a31c-b6565a4a78116766745004344442281.jpg");
            urlList.add("https://xingjing-gis.oss-cn-shanghai.aliyuncs.com/gis/ef13229f-e3e2-4202-9042-3c170ebba6de.scaled_4e230668-655e-4def-a31c-b6565a4a78116766745004344442281.jpg");
            urlList.add("https://xingjing-gis.oss-cn-shanghai.aliyuncs.com/gis/ef13229f-e3e2-4202-9042-3c170ebba6de.scaled_4e230668-655e-4def-a31c-b6565a4a78116766745004344442281.jpg");
            urlList.add("https://xingjing-gis.oss-cn-shanghai.aliyuncs.com/gis/ef13229f-e3e2-4202-9042-3c170ebba6de.scaled_4e230668-655e-4def-a31c-b6565a4a78116766745004344442281.jpg");
            urlList.add("https://xingjing-gis.oss-cn-shanghai.aliyuncs.com/gis/ef13229f-e3e2-4202-9042-3c170ebba6de.scaled_4e230668-655e-4def-a31c-b6565a4a78116766745004344442281.jpg");
        }

        XWPFParagraph paragraph = document.createParagraph();
        XWPFRun run = paragraph.createRun();

        List<BufferedImage> bufferedImageList = getBufferedImageList(urlList);

        for (int i = 0; i < bufferedImageList.size(); i++) {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(bufferedImageList.get(i), "jpg", baos);
            ByteArrayInputStream bis = new ByteArrayInputStream(baos.toByteArray());

            run.addPicture(bis, Document.PICTURE_TYPE_JPEG, "", Units.toEMU(90), Units.toEMU(100));
            if ((i + 1) % 4 == 0) { // 每4张图片换行
                run.addBreak(BreakType.TEXT_WRAPPING);
            } else {
                run.addTab(); // 同一行的图片之间添加间隔
            }
        }
    }

    @SneakyThrows
    public static List<BufferedImage> getBufferedImageList(List<String> urlList) {
        ExecutorService executor = Executors.newFixedThreadPool(12);        // 没有从 容器中获取线程池 todo
        List<Future<BufferedImage>> futures = new ArrayList<>();
        for (String url : urlList) {
            Callable<BufferedImage> task = () -> getImageFromUrl(url);
            futures.add(executor.submit(task));
        }
        executor.shutdown();

        List<BufferedImage> bufferedImageList = new ArrayList<>();
        for (Future<BufferedImage> future : futures) {
            bufferedImageList.add(future.get());
        }
        return bufferedImageList;
    }

    public static BufferedImage getImageFromUrl(String imageUrl) {
        URL url = null;
        try {
            url = new URL(imageUrl);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        try {
            return ImageIO.read(url);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void setStyle(XWPFDocument document) {
        XWPFStyles styles = document.createStyles();

        {
            String styleId = "Heading1";        //
            CTStyle ctStyle = CTStyle.Factory.newInstance();
            ctStyle.setStyleId(styleId);

            CTString name = CTString.Factory.newInstance();
            name.setVal(styleId);
            ctStyle.setName(name);

            //设置段落样式
            CTPPrGeneral pPr = ctStyle.addNewPPr();
            pPr.addNewOutlineLvl().setVal(BigInteger.valueOf(0)); // 大纲级别
            CTInd ind = pPr.addNewInd();
            ind.setLeft(BigInteger.valueOf(0));     //缩进

            //设置字体和颜色
            CTRPr rpr = ctStyle.addNewRPr();
            rpr.addNewSz().setVal(BigInteger.valueOf(16));
            rpr.addNewColor().setVal("000000");

            XWPFStyle style = new XWPFStyle(ctStyle);
            style.setType(STStyleType.PARAGRAPH);       //段落
            styles.addStyle(style);
        }
        {
            String styleId = "Heading2";        //
            CTStyle ctStyle = CTStyle.Factory.newInstance();
            ctStyle.setStyleId(styleId);

            CTString name = CTString.Factory.newInstance();
            name.setVal(styleId);
            ctStyle.setName(name);

            //设置段落样式
            CTPPrGeneral pPr = ctStyle.addNewPPr();
            pPr.addNewOutlineLvl().setVal(BigInteger.valueOf(1)); // 大纲级别
            CTInd ind = pPr.addNewInd();
            ind.setLeft(BigInteger.valueOf(360));     //缩进

            //设置字体和颜色
            CTRPr rpr = ctStyle.addNewRPr();
            rpr.addNewSz().setVal(BigInteger.valueOf(14));
            rpr.addNewColor().setVal("000000");

            XWPFStyle style = new XWPFStyle(ctStyle);
            style.setType(STStyleType.PARAGRAPH);       //段落
            styles.addStyle(style);
        }
        {
            String styleId = "Heading3";        //
            CTStyle ctStyle = CTStyle.Factory.newInstance();
            ctStyle.setStyleId(styleId);

            CTString name = CTString.Factory.newInstance();
            name.setVal(styleId);
            ctStyle.setName(name);

            //设置段落样式
            CTPPrGeneral pPr = ctStyle.addNewPPr();
            pPr.addNewOutlineLvl().setVal(BigInteger.valueOf(2)); // 大纲级别
            CTInd ind = pPr.addNewInd();
            ind.setLeft(BigInteger.valueOf(720));     //缩进

            //设置字体和颜色
            CTRPr rpr = ctStyle.addNewRPr();
            rpr.addNewSz().setVal(BigInteger.valueOf(12));
            rpr.addNewColor().setVal("000000");

            XWPFStyle style = new XWPFStyle(ctStyle);
            style.setType(STStyleType.PARAGRAPH);       //段落
            styles.addStyle(style);
        }

    }


    public void generateHeading(XWPFDocument document,String text, int level) {
        XWPFParagraph paragraph = document.createParagraph();

        paragraph.setAlignment(ParagraphAlignment.LEFT);        //左对齐
        paragraph.setSpacingBeforeLines(2);                     //行前距
        paragraph.setStyle("Heading" + level);                         //一级标题

        XWPFRun run = paragraph.createRun();
        run.setText(text);

        if(level==1){
            run.setFontSize(16);
            run.setBold(true);
        }else if(level==2){
            run.setFontSize(14);
            run.setBold(true);
        }else if(level==3){
            run.setFontSize(12);
        }
    }

    private static void createCustomStyle(XWPFStyles styles, String styleId) {
        CTStyle ctStyle = CTStyle.Factory.newInstance();
        ctStyle.setStyleId(styleId);

        // 设置样式名称
        CTString name = CTString.Factory.newInstance();
        name.setVal(styleId);
        ctStyle.setName(name);

        // 设置为段落样式
        CTPPrGeneral pPr = ctStyle.addNewPPr();
        pPr.addNewOutlineLvl().setVal(BigInteger.valueOf(0)); // 大纲级别

        // 设置字体大小和颜色
        CTRPr rpr = ctStyle.addNewRPr();
        rpr.addNewSz().setVal(BigInteger.valueOf(16)); // 14pt 字号
        rpr.addNewColor().setVal("000000"); // 蓝色字体

        // 将自定义样式添加到文档样式集中
        XWPFStyle style = new XWPFStyle(ctStyle);
        style.setType(STStyleType.PARAGRAPH); // 设置样式类型为段落
        styles.addStyle(style);
    }

    @SneakyThrows
    public void createBarChart(XWPFDocument document){
        XWPFChart chart = document.createChart(
                15*Units.EMU_PER_CENTIMETER,
                10*Units.EMU_PER_CENTIMETER
        );

        chart.setTitleText("工作内容统计对比");
        chart.setTitleOverlay(false);    //图例是否覆盖

        XDDFChartLegend legend = chart.getOrAddLegend();    //图例
        legend.setPosition(LegendPosition.TOP);      //图例位置


        XDDFCategoryAxis xAxis = chart.createCategoryAxis(AxisPosition.BOTTOM);
        xAxis.setTitle("工单类型");
        String[] xAxisData = new String[] {"修剪","浇水","病虫害"};
        XDDFCategoryDataSource xAxisSource = XDDFDataSourcesFactory.fromArray(xAxisData);


        XDDFValueAxis yAxis = chart.createValueAxis(AxisPosition.LEFT);
        yAxis.setTitle("数量");
        yAxis.setCrossBetween(AxisCrossBetween.BETWEEN);        //居中

        Integer[] yAxisNumberData = new Integer[]{10, 35, 21 };
        XDDFNumericalDataSource<Integer> yAxisNumberSource = XDDFDataSourcesFactory.fromArray(yAxisNumberData);

        Double[] yAxisAreaData = new Double[]{17.52, 24.152, 18.756 };
        XDDFNumericalDataSource<Double> yAxisAreaSource = XDDFDataSourcesFactory.fromArray(yAxisAreaData);



        XDDFChartData chartData = chart.createData(ChartTypes.BAR, xAxis, yAxis);
        if(chartData instanceof XDDFBarChartData barChart){
            barChart.setBarDirection(BarDirection.COL);     //设置柱状图方向为垂直
            barChart.setVaryColors(true);    //设置颜色

            //第一组数据
            XDDFChartData.Series series1 = barChart.addSeries(xAxisSource, yAxisNumberSource);
            if(series1 instanceof XDDFBarChartData.Series numberSeries){
                numberSeries.setTitle("工单数量(单)", null);

                CTDLbls ctdLbls = numberSeries.getCTBarSer().addNewDLbls();
                ctdLbls.addNewShowVal().setVal(true);           //显示值
                ctdLbls.addNewShowCatName().setVal(false);      // 不显示类别名称
                ctdLbls.addNewShowSerName().setVal(false);      // 不显示系列名称
                ctdLbls.addNewShowLegendKey().setVal(false);    // 不显示图例键
                ctdLbls.addNewDLblPos().setVal(STDLblPos.CTR);    //显示位置
            }

            //第二组数据
            XDDFChartData.Series series2 = barChart.addSeries(xAxisSource, yAxisAreaSource);
            if(series2 instanceof XDDFBarChartData.Series areaSeries){
                areaSeries.setTitle("面积(km²)", null);


                CTDLbls ctdLbls = areaSeries.getCTBarSer().addNewDLbls();
                ctdLbls.addNewShowVal().setVal(true);           //显示值
                ctdLbls.addNewShowCatName().setVal(false);      // 不显示类别名称
                ctdLbls.addNewShowSerName().setVal(false);      // 不显示系列名称
                ctdLbls.addNewShowLegendKey().setVal(false);    // 不显示图例键
                ctdLbls.addNewDLblPos().setVal(STDLblPos.CTR);    //显示位置
            }


            chart.plot(chartData);       //设置图表数据并更新
        }

    }



    public void generateTitle(XWPFDocument document,String title){
        XWPFParagraph paragraph = document.createParagraph();
        paragraph.setAlignment(ParagraphAlignment.CENTER);      //居中

        XWPFRun run = paragraph.createRun();
        run.setText(title);

        run.setFontSize(24);
        run.setBold(true);
    }

    /**
     * 生成主要梗概
     * @param document
     */
    private void generateSummary(XWPFDocument document) {
        XWPFParagraph paragraph = document.createParagraph();
        paragraph.setAlignment(ParagraphAlignment.LEFT);      //居左
        XWPFRun run = paragraph.createRun();
        run.setText("汇报日期: 2024-07-01 ~ 2024-07-07");
        run.addBreak();
        run.setText("汇报人: 张三");
        run.setFontSize(12);
    }

    private void addEmptyLine(XWPFDocument document){
        XWPFParagraph emptyParagraph = document.createParagraph();
        emptyParagraph.setSpacingBefore(200);  // 设置段前距离
        emptyParagraph.setSpacingAfter(200);   // 设置段后距离
    }

    @SneakyThrows
    public void generateDocument(XWPFDocument document){
        String fileName = "F:\\" + System.currentTimeMillis() + ".docx";
        // 将文档写入到磁盘文件
        FileOutputStream out = new FileOutputStream(fileName);
        document.write(out);
        out.close();
    }
}

```

