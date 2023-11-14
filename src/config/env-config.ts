export default () => ({
    products_base_url: process.env.PRODUCTS_BASE_URL,
    cron_job_scheduler: process.env.CRON_JOB_SCHEDULER,
    database_uri: process.env.DATABASE_URI,
    database_name: process.env.DATABASE_NAME
});
