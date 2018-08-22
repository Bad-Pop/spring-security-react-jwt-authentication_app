package fr.alexisvachard.authenticationpoc.web.admin.dto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class PagedResponse {

    private List<?> content;
    private Long offset;
    private int pageNumber;
    private int pageSize;
    private boolean lastPage;
    private Long totalElement;
    private int totalPages;
    private int size;
    private int number;
    private int numberOfElements;
    private boolean firstPage;

    private Pageable previousPageable;
    private Pageable nextPageable;

    public PagedResponse() {
    }

    public PagedResponse(List<?> content, Long offset, int pageNumber, int pageSize, boolean lastPage, Long totalElement, int totalPages, int size, int number, int numberOfElements, boolean firstPage, Pageable previousPageable, Pageable nextPageable) {
        this.content = content;
        this.offset = offset;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.lastPage = lastPage;
        this.totalElement = totalElement;
        this.totalPages = totalPages;
        this.size = size;
        this.number = number;
        this.numberOfElements = numberOfElements;
        this.firstPage = firstPage;
        this.previousPageable = previousPageable;
        this.nextPageable = nextPageable;
    }

    public PagedResponse (List<?> content, Page<?> page){
        this.content = content;
        this.offset = page.getPageable().getOffset();
        this.pageNumber = page.getPageable().getPageNumber();
        this.pageSize = page.getPageable().getPageSize();
        this.lastPage = page.isLast();
        this.totalElement = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.size = page.getSize();
        this.number = page.getNumber();
        this.numberOfElements = page.getNumberOfElements();
        this.firstPage = page.isFirst();
        this.previousPageable = page.previousPageable();
        this.nextPageable = page.nextPageable();
    }

    public List<?> getContent() {
        return content;
    }

    public void setContent(List<?> content) {
        this.content = content;
    }

    public Long getOffset() {
        return offset;
    }

    public void setOffset(Long offset) {
        this.offset = offset;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public boolean isLastPage() {
        return lastPage;
    }

    public void setLastPage(boolean lastPage) {
        this.lastPage = lastPage;
    }

    public Long getTotalElement() {
        return totalElement;
    }

    public void setTotalElement(Long totalElement) {
        this.totalElement = totalElement;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getNumberOfElements() {
        return numberOfElements;
    }

    public void setNumberOfElements(int numberOfElements) {
        this.numberOfElements = numberOfElements;
    }

    public boolean isFirstPage() {
        return firstPage;
    }

    public void setFirstPage(boolean firstPage) {
        this.firstPage = firstPage;
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
