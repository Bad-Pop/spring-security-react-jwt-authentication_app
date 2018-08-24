package fr.alexisvachard.authenticationpoc.web.dto.response;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class PagedResponseDto {

    private List<?> content;
    private int pageSize;
    private boolean isLastPage;
    private Long totalNumberOfElements;
    private int totalNumberOfPages;
    private int pageNumber;
    private int pageNumberOfElements;
    private boolean isFirstPage;

    private Pageable currentPageable;
    private Pageable previousPageable;
    private Pageable nextPageable;

    public PagedResponseDto() {
    }

    public PagedResponseDto(List<?> content, int pageSize, boolean isLastPage, Long totalNumberOfElements, int totalNumberOfPages, int pageNumber, int pageNumberOfElements, boolean isFirstPage, Pageable currentPageable, Pageable previousPageable, Pageable nextPageable) {
        this.content = content;
        this.pageSize = pageSize;
        this.isLastPage = isLastPage;
        this.totalNumberOfElements = totalNumberOfElements;
        this.totalNumberOfPages = totalNumberOfPages;
        this.pageNumber = pageNumber;
        this.pageNumberOfElements = pageNumberOfElements;
        this.isFirstPage = isFirstPage;
        this.previousPageable = previousPageable;
        this.nextPageable = nextPageable;
        this.currentPageable = currentPageable;
    }

    public PagedResponseDto(List<?> content, Page<?> page) {
        this.content = content;
        this.pageSize = page.getPageable().getPageSize();
        this.isLastPage = page.isLast();
        this.totalNumberOfElements = page.getTotalElements();
        this.totalNumberOfPages = page.getTotalPages();
        this.pageNumber = page.getNumber();
        this.pageNumberOfElements = page.getNumberOfElements();
        this.isFirstPage = page.isFirst();
        this.previousPageable = page.previousPageable();
        this.nextPageable = page.nextPageable();

        this.currentPageable = page.getPageable();
    }

    public List<?> getContent() {
        return content;
    }

    public void setContent(List<?> content) {
        this.content = content;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public boolean isLastPage() {
        return isLastPage;
    }

    public void setLastPage(boolean lastPage) {
        this.isLastPage = lastPage;
    }

    public Long getTotalNumberOfElements() {
        return totalNumberOfElements;
    }

    public void setTotalNumberOfElements(Long totalNumberOfElements) {
        this.totalNumberOfElements = totalNumberOfElements;
    }

    public int getTotalNumberOfPages() {
        return totalNumberOfPages;
    }

    public void setTotalNumberOfPages(int totalNumberOfPages) {
        this.totalNumberOfPages = totalNumberOfPages;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public boolean isFirstPage() {
        return isFirstPage;
    }

    public void setFirstPage(boolean firstPage) {
        this.isFirstPage = firstPage;
    }

    public int getPageNumberOfElements() {
        return pageNumberOfElements;
    }

    public void setPageNumberOfElements(int pageNumberOfElements) {
        this.pageNumberOfElements = pageNumberOfElements;
    }

    public Pageable getCurrentPageable() {
        return currentPageable;
    }

    public void setCurrentPageable(Pageable currentPageable) {
        this.currentPageable = currentPageable;
    }

    public Pageable getPreviousPageable() {
        return previousPageable;
    }

    public void setPreviousPageable(Pageable previousPageable) {
        this.previousPageable = previousPageable;
    }

    public Pageable getNextPageable() {
        return nextPageable;
    }

    public void setNextPageable(Pageable nextPageable) {
        this.nextPageable = nextPageable;
    }
}
